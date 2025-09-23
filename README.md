# SurakshaPath: Disaster Awareness Project

A comprehensive disaster awareness and preparedness platform for schools and communities.

## Features

- **Interactive Quizzes**: Test your knowledge with animated quizzes on various natural disasters
- **Preparedness Guides**: Learn how to prepare for different types of disasters
- **Drill Instructions**: Step-by-step guides for conducting safety drills
- **Leaderboards**: Track progress and encourage participation
- **Emergency Contacts**: Quick access to emergency services

## Tech Stack

- **Frontend**: React, TypeScript, Framer Motion, TailwindCSS
- **Backend**: Flask, SQLAlchemy, PostgreSQL
- **Deployment**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Python 3.11 (for local development)

### Running with Docker

```bash
# Start all services
docker-compose up

# Access the application at http://localhost:3000
```

### Local Development

```bash
# Backend setup
cd backend
python -m venv venv311
source venv311/bin/activate  # On Windows: venv311\Scripts\activate
pip install -r requirements.txt
python -c "from app import create_app; app = create_app(); from app.seeds import run_seeds; with app.app_context(): run_seeds()"
flask run

# Frontend setup
cd frontend
npm install
npm run dev
```

## Project Structure

- `/frontend`: React application
- `/backend`: Flask API server
- `/models`: ML models for chatbot functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.