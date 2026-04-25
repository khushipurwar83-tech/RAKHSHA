from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.config import settings
from src.api.v1.endpoints import auth, routes, sos, crime, reports, checkin, health, watch
from src.api.v1.websocket import location
from src.core.redis_client import redis_client

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json"
    )

    # Set all CORS enabled origins
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Startup / Shutdown events
    @app.on_event("startup")
    async def startup():
        await redis_client.connect()

    @app.on_event("shutdown")
    async def shutdown():
        await redis_client.close()

    # Include Routers
    app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Auth"])
    app.include_router(routes.router, prefix=f"{settings.API_V1_STR}/route", tags=["Routing"])
    app.include_router(sos.router, prefix=f"{settings.API_V1_STR}/sos", tags=["SOS"])
    app.include_router(crime.router, prefix=f"{settings.API_V1_STR}/crime", tags=["Crime"])
    app.include_router(reports.router, prefix=f"{settings.API_V1_STR}/report", tags=["Reports"])
    app.include_router(checkin.router, prefix=f"{settings.API_V1_STR}/checkin", tags=["Check-in"])
    app.include_router(health.router, prefix=f"{settings.API_V1_STR}/health-mode", tags=["Health Mode"])
    app.include_router(watch.router, prefix=f"{settings.API_V1_STR}/watch", tags=["Smart Watch"])
    app.include_router(location.router, tags=["Real-time Tracking"])

    @app.get("/")
    async def root():
        return {"message": "Welcome to RAKHSHA Intelligent Safe-Route API"}

    return app

app = create_app()
