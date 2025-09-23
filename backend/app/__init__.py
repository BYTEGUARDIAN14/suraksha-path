import os
from flask import Flask, jsonify
from .extensions import db, migrate, jwt, cors
from .config import get_config

def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(get_config())

    # Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Ensure models are registered for migrations
    from . import models  # noqa: F401

    # Blueprints
    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    # Health
    @app.get("/health")
    def health():
        return jsonify({"status": "ok"})

    return app

