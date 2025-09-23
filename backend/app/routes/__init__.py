from flask import Blueprint

api_bp = Blueprint("api", __name__)

# Import submodules to register routes
from . import auth, quizzes, drills, alerts, scores, contacts, admin  # noqa: E402,F401
from .chatbot import chatbot_bp
api_bp.register_blueprint(chatbot_bp)

