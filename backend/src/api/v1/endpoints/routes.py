from fastapi import APIRouter, Depends
from src.services.routing import routing_service
from src.schemas.route import RouteRequest, RouteResponse

router = APIRouter()

@router.post("/shortest", response_model=RouteResponse)
async def get_shortest_route(req: RouteRequest):
    return await routing_service.get_safe_route(req.start, req.end, mode="shortest")

@router.post("/lit-street", response_model=RouteResponse)
async def get_lit_route(req: RouteRequest):
    return await routing_service.get_safe_route(req.start, req.end, mode="safe")
