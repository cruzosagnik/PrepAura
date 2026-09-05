from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.question import Question
from app.models.user import User
from app.schemas.question import QuestionResponse

router = APIRouter(prefix="/questions", tags=["Question Bank"])


@router.get("/bank", response_model=List[QuestionResponse])
async def get_question_bank(
    topic: str | None = None,
    difficulty: str | None = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(Question)
    if topic:
        query = query.where(Question.topic.ilike(f"%{topic}%"))
    if difficulty:
        query = query.where(Question.difficulty.ilike(difficulty))
    query = query.limit(50)
    result = await db.execute(query)
    return list(result.scalars().all())