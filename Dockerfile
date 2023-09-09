FROM ubuntu:latest

WORKDIR /app

COPY requirements.txt ./

RUN apt update
RUN apt install python3 python3-pip -y
# RUN pip install -r /app/requirements.txt

COPY . .

WORKDIR /app/backend

CMD ["bash"]