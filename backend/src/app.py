from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.config import settings

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Import routers lazily to avoid crashing on missing optional deps
    try:
        from src.api.v1.endpoints import auth
        app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Auth"])
    except Exception as e:
        print(f"Warning: Could not load auth router: {e}")

    try:
        from src.api.v1.endpoints import routes
        app.include_router(routes.router, prefix=f"{settings.API_V1_STR}/route", tags=["Routing"])
    except Exception as e:
        print(f"Warning: Could not load routes router: {e}")

    try:
        from src.api.v1.endpoints import sos
        app.include_router(sos.router, prefix=f"{settings.API_V1_STR}/sos", tags=["SOS"])
    except Exception as e:
        print(f"Warning: Could not load sos router: {e}")

    try:
        from src.api.v1.endpoints import crime
        app.include_router(crime.router, prefix=f"{settings.API_V1_STR}/crime", tags=["Crime"])
    except Exception as e:
        print(f"Warning: Could not load crime router: {e}")

    try:
        from src.api.v1.endpoints import reports
        app.include_router(reports.router, prefix=f"{settings.API_V1_STR}/report", tags=["Reports"])
    except Exception as e:
        print(f"Warning: Could not load reports router: {e}")

    try:
        from src.api.v1.endpoints import checkin
        app.include_router(checkin.router, prefix=f"{settings.API_V1_STR}/checkin", tags=["Check-in"])
    except Exception as e:
        print(f"Warning: Could not load checkin router: {e}")

    try:
        from src.api.v1.endpoints import health
        app.include_router(health.router, prefix=f"{settings.API_V1_STR}/health-mode", tags=["Health Mode"])
    except Exception as e:
        print(f"Warning: Could not load health router: {e}")

    try:
        from src.api.v1.endpoints import watch
        app.include_router(watch.router, prefix=f"{settings.API_V1_STR}/watch", tags=["Smart Watch"])
    except Exception as e:
        print(f"Warning: Could not load watch router: {e}")

    try:
        from src.api.v1.websocket import location
        app.include_router(location.router, tags=["Real-time Tracking"])
    except Exception as e:
        print(f"Warning: Could not load location websocket: {e}")

    @app.get("/")
    async def root():
        return {"message": "Welcome to RAKHSHA Intelligent Safe-Route API", "status": "running"}

    @app.get("/health")
    async def health_check():
        return {"status": "healthy"}

    return app

app = create_app()
