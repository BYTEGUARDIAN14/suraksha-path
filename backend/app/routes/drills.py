from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt
from ..extensions import db
from ..models import Drill, DrillParticipation
from . import api_bp


@api_bp.get("/drills")
def get_drills():
    drills = db.session.scalars(db.select(Drill)).all()
    return jsonify([
        {"id": d.id, "disaster_type": d.disaster_type, "steps": d.steps, "steps_hi": d.steps_hi, "date": d.date.isoformat()}
        for d in drills
    ])


@api_bp.post("/drills/participate")
@jwt_required()
def participate_drill():
    sub = get_jwt().get("sub")
    user_id = sub.get("id") if isinstance(sub, dict) else None
    data = request.get_json() or {}
    drill_id = data.get("drill_id")
    if not drill_id:
        return jsonify({"error": "drill_id required"}), 400
    if not db.session.get(Drill, drill_id):
        return jsonify({"error": "Invalid drill_id"}), 404
    dp = DrillParticipation(user_id=user_id, drill_id=drill_id)
    db.session.add(dp)
    db.session.commit()
    return jsonify({"message": "Participation recorded"})

