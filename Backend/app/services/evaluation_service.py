from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.interview import Interview
from app.models.question import Answer, Question
from app.models.result import Result
from app.services.ai_service import AIService


class EvaluationService:

    @staticmethod
    async def evaluate_interview(
        db: AsyncSession,
        interview: Interview,
    ) -> Result:

        q_query = (
            select(Question)
            .where(Question.interview_id == interview.id)
            .order_by(Question.order_index)
        )

        questions = (
            await db.execute(q_query)
        ).scalars().all()

        a_query = (
            select(Answer)
            .where(Answer.interview_id == interview.id)
        )

        answers = (
            await db.execute(a_query)
        ).scalars().all()

        answer_map = {
            answer.question_id: answer.answer_text
            for answer in answers
        }

        question_texts = [
            question.question
            for question in questions
        ]

        answer_texts = [
            answer_map.get(
                question.id,
                "No answer provided.",
            )
            for question in questions
        ]

        eval_data = await AIService.evaluate_answers(
            interview.role,
            question_texts,
            answer_texts,
        )

        result = Result(
            interview_id=interview.id,
            overall_score=float(
                eval_data.get("overall_score", 75.0)
            ),
            technical_score=float(
                eval_data.get("technical_score", 75.0)
            ),
            communication_score=float(
                eval_data.get("communication_score", 75.0)
            ),
            problem_solving_score=float(
                eval_data.get("problem_solving_score", 75.0)
            ),
            strengths=eval_data.get("strengths", []),
            weaknesses=eval_data.get("weaknesses", []),
            recommendations=eval_data.get(
                "recommendations",
                [],
            ),
        )

        db.add(result)

        await db.commit()
        await db.refresh(result)

        return result