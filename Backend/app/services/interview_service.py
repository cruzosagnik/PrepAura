from datetime import datetime, timezone
from typing import List

from fastapi import HTTPException, status
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.interview import Interview
from app.models.question import Answer, Question
from app.models.result import Result
from app.schemas.interview import InterviewStartRequest
from app.schemas.question import AnswerCreate
from app.services.ai_service import AIService
from app.services.evaluation_service import EvaluationService


class InterviewService:

    @staticmethod
    async def start_interview(
        db: AsyncSession,
        user_id: int,
        config: InterviewStartRequest,
    ) -> Interview:

        interview = Interview(
            user_id=user_id,
            role=config.role,
            experience_level=config.experienceLevel,
            interview_type=config.type,
            difficulty=config.difficulty,
            question_count=config.questionCount,
            status="in_progress",
        )

        db.add(interview)
        await db.flush()

        raw_questions = await AIService.generate_questions(
            role=config.role,
            experience_level=config.experienceLevel,
            interview_type=config.type,
            difficulty=config.difficulty,
            count=config.questionCount,
        )

        for index, item in enumerate(raw_questions):
            question_obj = Question(
                interview_id=interview.id,
                topic=item.get("topic", "General"),
                question=item.get(
                    "question",
                    "Explain your experience.",
                ),
                difficulty=item.get(
                    "difficulty",
                    config.difficulty,
                ),
                hint=item.get("hint"),
                order_index=index,
            )

            db.add(question_obj)

        await db.commit()
        await db.refresh(interview)

        return await InterviewService.get_interview_by_id(
            db,
            interview.id,
            user_id,
        )

    @staticmethod
    async def get_interview_by_id(
        db: AsyncSession,
        interview_id: int,
        user_id: int,
    ) -> Interview:

        query = (
            select(Interview)
            .where(
                Interview.id == interview_id,
                Interview.user_id == user_id,
            )
            .options(
                selectinload(Interview.questions),
                selectinload(Interview.result),
            )
        )

        interview = (
            await db.execute(query)
        ).scalar_one_or_none()

        if not interview:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Interview session not found or unauthorized.",
            )

        return interview

    @staticmethod
    async def submit_answer(
        db: AsyncSession,
        interview_id: int,
        user_id: int,
        answer_data: AnswerCreate,
    ) -> Answer:

        interview = await InterviewService.get_interview_by_id(
            db,
            interview_id,
            user_id,
        )

        if interview.status == "completed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot submit answers to an already completed interview.",
            )

        q_query = select(Question).where(
            Question.id == answer_data.question_id,
            Question.interview_id == interview_id,
        )

        question = (
            await db.execute(q_query)
        ).scalar_one_or_none()

        if not question:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Question does not belong to this interview session.",
            )

        existing_a_query = select(Answer).where(
            Answer.interview_id == interview_id,
            Answer.question_id == answer_data.question_id,
        )

        existing_answer = (
            await db.execute(existing_a_query)
        ).scalar_one_or_none()

        if existing_answer:
            existing_answer.answer_text = answer_data.answer_text
            existing_answer.submitted_at = datetime.now(
                timezone.utc
            )

            await db.commit()
            await db.refresh(existing_answer)

            return existing_answer

        new_answer = Answer(
            interview_id=interview_id,
            question_id=answer_data.question_id,
            answer_text=answer_data.answer_text,
        )

        db.add(new_answer)

        await db.commit()
        await db.refresh(new_answer)

        return new_answer

    @staticmethod
    async def complete_interview(
        db: AsyncSession,
        interview_id: int,
        user_id: int,
    ) -> Result:

        interview = await InterviewService.get_interview_by_id(
            db,
            interview_id,
            user_id,
        )

        if interview.status == "completed" and interview.result:
            return interview.result

        interview.status = "completed"
        interview.completed_at = datetime.now(timezone.utc)

        await db.commit()

        result = await EvaluationService.evaluate_interview(
            db,
            interview,
        )

        return result

    @staticmethod
    async def get_user_history(
        db: AsyncSession,
        user_id: int,
    ) -> List[Interview]:

        query = (
            select(Interview)
            .where(Interview.user_id == user_id)
            .options(selectinload(Interview.result))
            .order_by(desc(Interview.started_at))
        )

        interviews = (
            await db.execute(query)
        ).scalars().all()

        return list(interviews)