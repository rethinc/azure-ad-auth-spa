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
