from fastapi import FastAPI

from app.modules.rate_limiting_config_module import configure_rate_limiting
from app.modules.cors_config_module import configure_cors

def create_app():
    """Creates and configures the FastAPI application."""
    app = FastAPI()

    configure_rate_limiting(app)
    configure_cors(app)

    return app