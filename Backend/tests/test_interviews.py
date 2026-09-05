from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_start_interview_unauthorized():
    payload = {
        "role": "Frontend Developer",
        "experienceLevel": "Mid-Level",
        "type": "Technical",
        "difficulty": "Medium",
        "questionCount": 5,
    }
    response = client.post("/api/interviews/start", json=payload)
    assert response.status_code == 401