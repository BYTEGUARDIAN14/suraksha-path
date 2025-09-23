@echo off
REM Set your Python 3.11 path here if needed
set PY311="C:\Users\HP\AppData\Local\Programs\Python\Python311\python.exe"

REM 1. Create virtual environment if it doesn't exist
if not exist venv311 (
    %PY311% -m venv venv311
)

REM 2. Activate the virtual environment
call venv311\Scripts\activate

REM 3. Install dependencies
if exist requirements.txt (
    pip install -r requirements.txt
) else (
    pip install flask flask_sqlalchemy flask_migrate flask_jwt_extended flask_cors sqlalchemy
)

REM 4. Seed the database (try create_app, fallback to app)
python -c "from app import create_app; app = create_app(); from app.seeds import run_seeds; with app.app_context(): run_seeds()" 2> seed_error.log

REM If the above fails, try the fallback
findstr /C:"AttributeError" seed_error.log >nul
if %errorlevel%==0 (
    python -c "from app import app; from app.seeds import run_seeds; with app.app_context(): run_seeds()"
)

echo.
echo Backend setup and seeding complete!
pause
