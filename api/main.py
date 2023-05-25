from fastapi import FastAPI

app = FastAPI()


@app.get("/persons")
async def get_persons():
    return {
        "data": [
            {
                "id": "efdde3f9-6b6f-4c62-9e3e-2ad9614cc395",
                "name": "Hans",
                "familyName": "Probiert"
            },
        ]
    }
