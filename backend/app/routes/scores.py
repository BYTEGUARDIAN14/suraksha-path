from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt
from sqlalchemy import func
from ..extensions import db
from ..models import Score
from . import api_bp


@api_bp.get("/scores/me")
@jwt_required()
def my_scores():
    identity = get_jwt()["sub"]
    user_id = identity["id"] if isinstance(identity, dict) else identity
    scores = db.session.scalars(db.select(Score).filter_by(user_id=user_id)).all()
    return jsonify([
        {"quiz_id": s.quiz_id, "score": s.score, "date": s.date.isoformat()} for s in scores
    ])


@api_bp.get("/preparedness")
@jwt_required()
def preparedness():
    identity = get_jwt()["sub"]
    user_id = identity["id"] if isinstance(identity, dict) else identity
    avg_score = db.session.scalar(
        db.select(func.coalesce(func.avg(Score.score), 0)).filter(Score.user_id == user_id)
    )
    return jsonify({"preparedness_score": round(float(avg_score or 0), 2)})

