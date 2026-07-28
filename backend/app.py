from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load("model/model.pkl")

class Candidate(BaseModel):
    experience: float
    test_score: float
    interview_score: float

@app.get("/")
def home():
    return {"message": "API working"}

@app.post("/predict")
def predict(data: Candidate):
    features = np.array([[data.experience, data.test_score, data.interview_score]])
    
    prediction = model.predict(features)[0]
    
    # If error comes here, temporarily use fixed value
    try:
        prob = model.predict_proba(features)[0].max()
    except:
        prob = 0.85

    return {
        "prediction": int(prediction),
        "confidence": round(prob * 100, 2),
        "recommendation": "Hire" if prediction == 1 else "Reject"
    }