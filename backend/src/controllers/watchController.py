from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_watch(): return []