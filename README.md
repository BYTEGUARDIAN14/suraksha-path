# SIH 2025 - Disaster Preparedness Platform

Services:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

Quick start:
1) Copy env sample: `cp .env.example .env`
2) Start: `docker-compose up --build`
3) Seeded users:
   - Admin: admin@sih.test / Admin@123
   - Student1: student1@sih.test / Student@123
   - Student2: student2@sih.test / Student@123

## Viewing Backend Error Logs

**For Docker Compose:**

To see real-time backend logs (including errors and stack traces):

```
docker compose logs -f backend
```

**For Local Flask Development:**

If you run Flask directly (not in Docker), all errors and logs will appear in the terminal where you started Flask:

```
flask run
# or
python -m flask run
```

**Tip:**
- Always keep a terminal open with backend logs while developing.
- When debugging API errors (like 500 Internal Server Error), check the backend logs for Python tracebacks and error messages.

