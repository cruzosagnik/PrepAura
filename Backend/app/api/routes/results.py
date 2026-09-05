from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.interview import Interview
from app.models.result import Result
from app.models.user import User
from app.schemas.result import ResultResponse

router = APIRouter(prefix="/results", tags=["Results"])


@router.get("/{result_id}", response_model=ResultResponse)
async def get_result_by_id(
    result_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = (
        select(Result)
        .join(Interview)
        .where(Result.id == result_id, Interview.user_id == current_user.id)
    )
    result = (await db.execute(query)).scalar_one_or_none()
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Result not found.")
    return result