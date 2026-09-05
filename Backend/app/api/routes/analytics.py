from typing import Any, Dict
from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.interview import Interview
from app.models.result import Result
from app.models.user import User

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/overview", response_model=Dict[str, Any])
async def get_analytics_overview(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Total interviews
    total_query = select(func.count(Interview.id)).where(Interview.user_id == current_user.id)
    total_interviews = (await db.execute(total_query)).scalar() or 0

    # Completed interviews
    completed_query = select(func.count(Interview.id)).where(
        Interview.user_id == current_user.id, Interview.status == "completed"
    )
    completed_interviews = (await db.execute(completed_query)).scalar() or 0

    # Averages
    avg_query = (
        select(
            func.avg(Result.overall_score),
            func.avg(Result.technical_score),
            func.avg(Result.communication_score),
            func.avg(Result.problem_solving_score),
        )
        .join(Interview)
        .where(Interview.user_id == current_user.id)
    )
    avg_row = (await db.execute(avg_query)).first()
    avg_overall = round(avg_row[0], 1) if avg_row and avg_row[0] is not None else 0.0
    avg_tech = round(avg_row[1], 1) if avg_row and avg_row[1] is not None else 0.0
    avg_comm = round(avg_row[2], 1) if avg_row and avg_row[2] is not None else 0.0
    avg_prob = round(avg_row[3], 1) if avg_row and avg_row[3] is not None else 0.0

    skill_scores = {
        "Technical Knowledge": avg_tech,
        "Communication": avg_comm,
        "Problem Solving": avg_prob,
    }
    sorted_skills = sorted(skill_scores.items(), key=lambda item: item[1], reverse=True)
    strongest_skill = sorted_skills[0][0] if avg_overall > 0 else "N/A"
    weakest_skill = sorted_skills[-1][0] if avg_overall > 0 else "N/A"

    # Recent history scores
    recent_query = (
        select(Interview.id, Interview.role, Interview.completed_at, Result.overall_score)
        .join(Result, Interview.id == Result.interview_id)
        .where(Interview.user_id == current_user.id, Interview.status == "completed")
        .order_by(Interview.completed_at.desc())
        .limit(5)
    )
    recent_rows = (await db.execute(recent_query)).all()
    recent_scores = [
        {
            "interview_id": row[0],
            "role": row[1],
            "completed_at": row[2].isoformat() if row[2] else None,
            "score": row[3],
        }
        for row in recent_rows
    ]

    return {
        "total_interviews": total_interviews,
        "completed_interviews": completed_interviews,
        "average_score": avg_overall,
        "strongest_skill": strongest_skill,
        "weakest_skill": weakest_skill,
        "skill_breakdown": {
            "technical": avg_tech,
            "communication": avg_comm,
            "problem_solving": avg_prob,
        },
        "recent_scores": recent_scores,
    }