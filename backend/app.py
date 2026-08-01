from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

# 🔥 CORS (VERY IMPORTANT for frontend connection)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # after deployment you can restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load ML model
model = joblib.load("model/model.pkl")

# ✅ Input schema (must match your dataset features)
class Candidate(BaseModel):
    experience: float
    test_score: float
    interview_score: float

# ✅ Test route
@app.get("/")
def home():
    return {"message": "Recruitment AI API running"}

# ✅ Prediction route
@app.post("/predict")
def predict(data: Candidate):
    try:
        # Convert input to model format
        features = np.array([[data.experience, data.test_score, data.interview_score]])

        # Prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0].max()

        return {
            "prediction": int(prediction),
            "confidence": round(probability * 100, 2),
            "recommendation": "Hire" if prediction == 1 else "Reject"
        }

    except Exception as e:
        return {"error": str(e)}
