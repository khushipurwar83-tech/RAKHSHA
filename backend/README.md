# RAKHSHA - Intelligent Safe-Route Backend

Production-ready FastAPI backend for the Rakhsha Women's Safety Platform.

## Features
- **PostGIS Integration**: Real-time spatial queries for routes and refuges.
- **Crime Prediction**: ML-based risk assessment using XGBoost.
- **WebSocket Tracking**: Live location tracking with safety boundary monitoring.
- **Emergency SOS**: Multi-channel alerts via SMS (Twilio) and Push (FCM).

## Tech Stack
- **API**: FastAPI + Uvicorn
- **DB**: PostgreSQL + PostGIS + SQLAlchemy (Async)
- **Cache**: Redis (Rate limiting + WS state)
- **ML**: XGBoost + Scikit-Learn

## Setup

1. **Environment**:
   ```bash
   cp .env.example .env
   # Update variables in .env
   ```

2. **Run with Docker (Recommended)**:
   ```bash
   docker-compose up --build
   ```

3. **Local Installation**:
   ```bash
   pip install -r requirements.txt
   python main.py
   ```

4. **Train Model**:
   ```bash
   python src/scripts/train_crime_model.py
   ```

## API Documentation
Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Deployment
Recommended: AWS EC2 / DigitalOcean with Docker.
For the database, use Supabase (PostGIS enabled) or Neon.
For Redis, use Upstash (Free tier).
