from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.question import QuestionResponse
from app.schemas.result import ResultResponse


class InterviewStartRequest(BaseModel):
    role: str = Field(..., min_length=2, max_length=100)
    experienceLevel: str = Field(..., min_length=2, max_length=50)
    type: str = Field(..., min_length=2, max_length=50)
    difficulty: str = Field(..., min_length=2, max_length=50)
    questionCount: int = Field(5, ge=1, le=20)


class InterviewResponse(BaseModel):
    id: int
    user_id: int
    role: str
    experience_level: str
    interview_type: str
    difficulty: str
    question_count: int
    status: str
    started_at: datetime
    completed_at: Optional[datetime] = None
    questions: List[QuestionResponse] = []
    result: Optional[ResultResponse] = None

    model_config = ConfigDict(from_attributes=True)


class InterviewSummaryResponse(BaseModel):
    id: int
    user_id: int
    role: str
    experience_level: str
    interview_type: str
    difficulty: str
    question_count: int
    status: str
    started_at: datetime
    completed_at: Optional[datetime] = None
    overall_score: Optional[float] = None

    model_config = ConfigDict(from_attributes=True)