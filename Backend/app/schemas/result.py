from datetime import datetime
from typing import List
from pydantic import BaseModel, ConfigDict


class ResultResponse(BaseModel):
    id: int
    interview_id: int
    overall_score: float
    technical_score: float
    communication_score: float
    problem_solving_score: float
    strengths: List[str]
    weaknesses: List[str]
    recommendations: List[str]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)