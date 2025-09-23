from flask import request, jsonify, Response, stream_with_context
from flask_jwt_extended import jwt_required, get_jwt
from flask_jwt_extended import decode_token
from ..extensions import db
from ..models import Alert
from . import api_bp
import queue
from typing import List


_subscribers: List[queue.Queue] = []


@api_bp.get("/alerts")
@jwt_required(optional=True)
def get_alerts():
    token_sub = None
    try:
        token_sub = get_jwt().get("sub") if get_jwt() else None
    except Exception:
        token_sub = None
    region = None
    if isinstance(token_sub, dict):
        region = token_sub.get("region")

    stmt = db.select(Alert).order_by(Alert.created_at.desc())
    if region:
        # Return alerts for user's region or global (null region)
        alerts = db.session.scalars(stmt).all()
        alerts = [a for a in alerts if (a.region is None) or (a.region == region)]
    else:
        alerts = db.session.scalars(stmt).all()
    return jsonify([
        {"id": a.id, "message": a.message, "message_hi": a.message_hi, "disaster_type": a.disaster_type, "created_at": a.created_at.isoformat(), "region": a.region}
        for a in alerts
    ])


@api_bp.post("/alerts")
@jwt_required()
def create_alert():
    claims = get_jwt()["sub"]
    role = claims.get("role") if isinstance(claims, dict) else None
    if role != "admin":
        return jsonify({"error": "Admin only"}), 403
    data = request.get_json() or {}
    if not data.get("message") or not data.get("disaster_type"):
        return jsonify({"error": "message and disaster_type required"}), 400
    alert = Alert(message=data["message"], disaster_type=data["disaster_type"], region=data.get("region"), message_hi=data.get("message_hi"))
    db.session.add(alert)
    db.session.commit()

    # Broadcast to subscribers
    payload = {"id": alert.id, "message": alert.message, "message_hi": alert.message_hi, "disaster_type": alert.disaster_type, "region": alert.region}
    for q in list(_subscribers):
        try:
            q.put_nowait(payload)
        except Exception:
            pass

    return jsonify({"message": "Alert created"}), 201


@api_bp.get("/alerts/stream")
def alerts_stream():
    # Optional token for region-aware filtering
    token = request.args.get("token")
    user_region = None
    if token:
        try:
            decoded = decode_token(token)
            sub = decoded.get("sub") if isinstance(decoded, dict) else None
            if isinstance(sub, dict):
                user_region = sub.get("region")
        except Exception:
            user_region = None

    q = queue.Queue()
    _subscribers.append(q)

    def event_stream():
        try:
            while True:
                data = q.get()
                if user_region and data.get("region") not in (None, user_region):
                    continue
                import json
                yield f"data: {json.dumps(data)}\n\n"
        except GeneratorExit:
            pass
        finally:
            try:
                _subscribers.remove(q)
            except ValueError:
                pass

    headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        "X-Accel-Buffering": "no",
    }
    return Response(stream_with_context(event_stream()), headers=headers)

