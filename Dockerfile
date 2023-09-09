FROM ubuntu:latest

WORKDIR /app

COPY requirements.txt ./

RUN apt update
RUN apt install python3 python3-pip -y
RUN apt install ffmpeg -y
RUN pip install -r /app/requirements.txt

COPY . .

WORKDIR /app/backend

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]