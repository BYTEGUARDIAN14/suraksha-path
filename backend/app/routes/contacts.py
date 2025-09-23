from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from ..extensions import db
from ..models import EmergencyContact
from . import api_bp


@api_bp.get("/contacts")
@jwt_required(optional=True)
def list_contacts():
    region = None
    try:
        sub = get_jwt().get("sub") if get_jwt() else None
        if isinstance(sub, dict):
            region = sub.get("region")
    except Exception:
        region = None
    stmt = db.select(EmergencyContact)
    contacts = db.session.scalars(stmt).all()
    if region:
        contacts = [c for c in contacts if (c.region is None) or (c.region == region)]
    return jsonify([
        {"id": c.id, "name": c.name, "phone": c.phone, "type": c.type, "region": c.region}
        for c in contacts
    ])


@api_bp.post("/contacts")
@jwt_required()
def create_contact():
    sub = get_jwt().get("sub")
    role = sub.get("role") if isinstance(sub, dict) else None
    if role != "admin":
        return jsonify({"error": "Admin only"}), 403
    data = request.get_json() or {}
    if not data.get("name") or not data.get("phone") or not data.get("type"):
        return jsonify({"error": "name, phone, type required"}), 400
    c = EmergencyContact(name=data["name"], phone=data["phone"], type=data["type"], region=data.get("region"))
    db.session.add(c)
    db.session.commit()
    return jsonify({"message": "Contact created"}), 201


@api_bp.delete("/contacts/<int:cid>")
@jwt_required()
def delete_contact(cid: int):
    sub = get_jwt().get("sub")
    role = sub.get("role") if isinstance(sub, dict) else None
    if role != "admin":
        return jsonify({"error": "Admin only"}), 403
    c = db.session.get(EmergencyContact, cid)
    if not c:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(c)
    db.session.commit()
    return jsonify({"message": "Deleted"})

