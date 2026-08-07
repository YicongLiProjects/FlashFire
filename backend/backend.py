from fastapi import FastAPI, Request
from pickle import load
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from job_processing import *

# Instantiate backend
api = FastAPI()


# Load model
with open("model.pkl", "rb") as f:
    model = load(f)

# Middleware
api.add_middleware(
    CORSMiddleware,
    allow_origins=["https://flashfire.onrender.com"],
    allow_methods=["*"],
    allow_headers=["*"]
)

FEATURE_ORDER = [
    "data_scientist", "data_engineer", "senior_data_scientist",
    "data_analyst", "senior_data_engineer",
    "python_yn", "R_yn", "spark", "aws", "excel",
]

WORKING_HOURS = 2080

# Use this to predict salaries from the model
@api.post("/predict_salary")
async def predict_salary(request: Request):
    """
    Predicts salary using a trained model and return the predicted salaries for each job
    in the request
    """
    body = await request.json()

    # Process jobs one by one
    pred_input = []
    wage_unit_by_job = []
    for job in body:
        t = job["jobTitle"]
        skills = job["skillSet"]
        wage_unit = job["wageOption"]
        encoded = {**process_job_title(t), **process_job_skills(skills)}
        pred_input.append([encoded[col] for col in FEATURE_ORDER])
        wage_unit_by_job.append(wage_unit)

    pred_input = np.array(pred_input)
    predictions = model.predict(pred_input)

    # Process returns into yearly and hourly wages
    pred_return = [[round(float(p[0]), 2), round(float(p[1]), 2)] for p in predictions]
    for i in range(0, len(pred_return)):
        if wage_unit_by_job[i] == "yearly":
            pred_return[i][0] *= 1000
            pred_return[i][1] *= 1000
        elif wage_unit_by_job[i] == "hourly":
            pred_return[i][0] *= (1000 / 2080)
            pred_return[i][1] *= (1000 / 2080)
            pred_return[i][0] = round(pred_return[i][0], 2)
            pred_return[i][1] = round(pred_return[i][1], 2)

    # List comprehension to return predictions one by one
    return {
        "predictions": pred_return
    }
