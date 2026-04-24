import uvicorn
from dotenv import load_dotenv
import os

load_dotenv()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    # We run the application from src.app:app
    uvicorn.run(
        "src.app:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
