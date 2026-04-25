import redis.asyncio as redis
from src.core.config import settings

class RedisClient:
    def __init__(self):
        self.redis = None

    async def connect(self):
        self.redis = await redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True
        )

    async def close(self):
        if self.redis:
            await self.redis.close()

    async def set(self, key: str, value: str, expire: int = None):
        await self.redis.set(key, value, ex=expire)

    async def get(self, key: str):
        return await self.redis.get(key)

redis_client = RedisClient()
