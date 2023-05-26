FROM python:3.10-alpine

WORKDIR /app

COPY requirements.txt .

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

COPY main.py .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]