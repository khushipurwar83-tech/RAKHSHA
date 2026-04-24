from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import socketio

# Initialize FastAPI
app = FastAPI(
    title="RAKHSHA API",
    description="Backend for RAKHSHA Women Safety Navigation System",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Socket.IO setup
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

from src.routes import authRoutes, sosRoutes, routeRoutes, heatmapRoutes, reportRoutes, userRoutes, safeHavenRoutes

app.include_router(authRoutes.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(sosRoutes.router, prefix="/api/sos", tags=["SOS"])
app.include_router(routeRoutes.router, prefix="/api/routes", tags=["Routing"])
app.include_router(heatmapRoutes.router, prefix="/api/heatmap", tags=["Heatmap"])
app.include_router(reportRoutes.router, prefix="/api/reports", tags=["Reports"])
app.include_router(userRoutes.router, prefix="/api/users", tags=["Users"])
app.include_router(safeHavenRoutes.router, prefix="/api/safe-havens", tags=["Safe Havens"])




# Store sio in state for controllers
app.state.sio = sio

from src.sockets.locationTracker import register_location_handlers
register_location_handlers(sio)

@app.get("/")
async def root():
    return {"message": "Welcome to RAKHSHA API. The system is online."}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error", "message": str(exc)}
    )

# The server runner will use the socket_app instead if you want websockets on the same port
# But for uvicorn we run src.app:socket_app
app = socket_app
