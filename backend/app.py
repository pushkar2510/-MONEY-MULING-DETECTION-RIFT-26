import os
from flask import Flask
from flask_cors import CORS
from routes.analyze import analyze_bp


def get_allowed_origins():
    env_origins = os.getenv("FRONTEND_ORIGINS", "")
    env_origin = os.getenv("FRONTEND_ORIGIN", "")

    parsed_env_origins = [origin.strip() for origin in env_origins.split(",") if origin.strip()]

    default_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        r"https://.*\.onrender\.com",
    ]

    origins = []
    if env_origin:
        origins.append(env_origin.strip())
    origins.extend(parsed_env_origins)

    if not origins:
        origins = default_origins

    return origins

def create_app():
    app = Flask(__name__)
    CORS(
        app,
        resources={
            r"/*": {
                "origins": get_allowed_origins(),
                "methods": ["GET", "POST", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization"],
            }
        },
        supports_credentials=False,
        max_age=86400,
    )

    app.register_blueprint(analyze_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
