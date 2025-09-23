from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt
from sqlalchemy import func
from ..extensions import db
from ..models import Score, DrillParticipation
from . import api_bp


@api_bp.get("/admin/analytics")
@jwt_required()
def admin_analytics():
    sub = get_jwt().get("sub")
    role = sub.get("role") if isinstance(sub, dict) else None
    if role != "admin":
        return jsonify({"error": "Admin only"}), 403

    avg_preparedness = db.session.scalar(db.select(func.coalesce(func.avg(Score.score), 0))) or 0
    total_scores = db.session.scalar(db.select(func.count(Score.id))) or 0
    total_drill_participations = db.session.scalar(db.select(func.count(DrillParticipation.id))) or 0

    # time-bucketed data (last 7 days)
    from datetime import datetime, timedelta
    now = datetime.utcnow()
    days = []
    for i in range(6, -1, -1):
        day = (now - timedelta(days=i)).date()
        days.append(day)

    # Scores per day
    score_series = []
    for day in days:
        start = datetime.combine(day, datetime.min.time())
        end = datetime.combine(day, datetime.max.time())
        count = db.session.scalar(db.select(func.count(Score.id)).where(Score.date >= start, Score.date <= end)) or 0
        score_series.append({"day": day.isoformat(), "count": int(count)})

    # Drill participation per day
    drill_series = []
    for day in days:
        start = datetime.combine(day, datetime.min.time())
        end = datetime.combine(day, datetime.max.time())
        count = db.session.scalar(db.select(func.count(DrillParticipation.id)).where(DrillParticipation.completed_at >= start, DrillParticipation.completed_at <= end)) or 0
        drill_series.append({"day": day.isoformat(), "count": int(count)})

    return jsonify({
        "avg_preparedness": float(round(avg_preparedness, 2)),
        "total_scores": int(total_scores),
        "total_drill_participations": int(total_drill_participations),
        "score_series": score_series,
        "drill_series": drill_series,
    })

