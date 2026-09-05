from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "service": "PrepAura Backend"}


def test_unauthorized_me():
    response = client.get("/api/auth/me")
    assert response.status_code == 401