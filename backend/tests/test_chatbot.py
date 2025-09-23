import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_chatbot_answer(client):
    resp = client.post('/api/chatbot', json={"question": "What should I do during an earthquake?"})
    assert resp.status_code == 200
    data = resp.get_json()
    assert data['question']
    assert isinstance(data['answer'], str)
    assert 0 <= data['score'] <= 1
    assert 'drop' in data['answer'].lower() or 'cover' in data['answer'].lower()

def test_chatbot_empty(client):
    resp = client.post('/api/chatbot', json={"question": ""})
    assert resp.status_code == 400
    data = resp.get_json()
    assert 'error' in data
