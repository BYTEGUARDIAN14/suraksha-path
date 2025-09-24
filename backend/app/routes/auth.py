from flask import request, jsonify
from flask_jwt_extended import create_access_token
from ..extensions import db
from ..models import User, UserRole
from . import api_bp


@api_bp.post("/auth/register")
def register():
    data = request.get_json() or {}
    required = ["name", "email", "password", "role"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing fields"}), 400

    if data["role"] not in [r.value for r in UserRole]:
        return jsonify({"error": "Invalid role"}), 400

    if db.session.scalar(db.select(User).filter_by(email=data["email"])):
        return jsonify({"error": "Email already registered"}), 400

    user = User(
        name=data["name"],
        email=data["email"],
        role=data["role"],
        region=data.get("region"),
    )
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Registered successfully"}), 201


@api_bp.post("/auth/login")
def login():
    data = request.get_json() or {}
    user = db.session.scalar(db.select(User).filter_by(email=data.get("email")))
    if not user or not user.check_password(data.get("password", "")):
        return jsonify({"error": "Invalid credentials"}), 401
    token = create_access_token(identity={"id": user.id, "role": user.role, "region": user.region})
    return jsonify({
        "access_token": token,
        "user": {"id": user.id, "name": user.name, "role": user.role, "region": user.region},
    })

