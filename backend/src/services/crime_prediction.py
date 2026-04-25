import joblib
import pandas as pd
import numpy as np
from typing import Dict
from src.core.config import settings

class CrimePredictionService:
    def __init__(self):
        self.model_path = "src/scripts/crime_model.joblib"
        self.model = None
        try:
            self.model = joblib.load(self.model_path)
        except:
            print("Warning: Crime prediction model not found. Using fallback scoring.")

    async def get_risk_score(self, lat: float, lng: float) -> Dict:
        # Fallback logic if model is not loaded
        if not self.model:
            # Synthetic risk based on coordinates (demo purposes)
            score = (abs(lat) + abs(lng)) % 100
        else:
            # Predict using loaded model
            features = pd.DataFrame([[lat, lng]], columns=['lat', 'lng'])
            score = self.model.predict_proba(features)[0][1] * 100

        # Determine color code
        if score < 30:
            color = "green"
            label = "Low Risk"
        elif score < 70:
            color = "yellow"
            label = "Moderate Risk"
        else:
            color = "red"
            label = "High Risk"

        return {
            "score": round(score, 2),
            "color_code": color,
            "label": label,
            "lat": lat,
            "lng": lng
        }

crime_prediction_service = CrimePredictionService()
