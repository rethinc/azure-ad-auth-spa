from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/persons")
async def get_persons():
    return {
        "data": [
            {
                "id": "efdde3f9-6b6f-4c62-9e3e-2ad9614cc395",
                "name": "Hans",
                "familyName": "Probiert"
            },
            {
                "id": "83b97683-6601-4958-88bc-ff74c3d3f2a5",
                "name": "Peter",
                "familyName": "Frickelt"
            },
        ]
    }


@app.get("/timeslots")
async def get_persons():
    return {
        "data": [
            {
                "id": "268f5bbf-58d7-41f9-9cc3-4eac001c5471",
                "weekday": "Monday",
                "startTime": "10:30",
                "endTime": "12:00",
            },
            {
                "id": "f07d38f9-311e-4f3e-8883-dc773d7bbee3",
                "weekday": "Monday",
                "startTime": "13:30",
                "endTime": "15:00",
            },
            {
                "id": "9a0ee5c9-5342-4276-b42e-b4df4a1aa619",
                "weekday": "Tuesday",
                "startTime": "10:30",
                "endTime": "12:00",
            },
        ]
    }