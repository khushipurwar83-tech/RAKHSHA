import pandas as pd
import numpy as np
from xgboost import XGBClassifier
import joblib
import os

def generate_synthetic_crime_data(samples=5000):
    # Latitude and longitude around a central city
    center_lat, center_lng = 28.6139, 77.2090 # Delhi
    
    lats = np.random.uniform(center_lat - 0.5, center_lat + 0.5, samples)
    lngs = np.random.uniform(center_lng - 0.5, center_lng + 0.5, samples)
    
    # Generate labels: High risk if near specific "dangerous" zones (synthetic)
    # Zone 1: Center
    # Zone 2: North West
    risk_factor = (np.sin(lats * 10) + np.cos(lngs * 10)) > 0.5
    labels = risk_factor.astype(int)
    
    return pd.DataFrame({
        'lat': lats,
        'lng': lngs,
        'risk': labels
    })

def train_model():
    print("Generating synthetic data...")
    df = generate_synthetic_crime_data()
    
    X = df[['lat', 'lng']]
    y = df['risk']
    
    print("Training XGBoost model...")
    model = XGBClassifier(
        n_estimators=100,
        max_depth=5,
        learning_rate=0.1,
        random_state=42
    )
    model.fit(X, y)
    
    output_path = 'src/scripts/crime_model.joblib'
    joblib.dump(model, output_path)
    print(f"Model saved to {output_path}")

if __name__ == "__main__":
    train_model()
