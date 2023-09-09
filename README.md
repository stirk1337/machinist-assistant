# Ассистент машиниста

Мы представляем голосовой помощник машиниста - автоматизированную замену помощнику-человеку.
Благодаря решению на основе машинного обучения имитируется живое общение: машинист электровоза 3ЭС5К задаёт вопрос голосом и быстро получает на него озвучиваемый ответ. Если голосовой помощник не понял сути вопроса, он его уточнит на основе распознанной речи - машинисту достаточно выбрать из предложенного списка неисправностей. что именно пошло не так.

Технологический стек решения: React, Python, FastAPI, SBERT, Whisper

Уникальность нашего решения заключается в нескольких деталях:
* возможность подкорректировать результаты распознавания устной речи;
* высокая масштабируемость: модель будет работать с любым файлом csv;
* решение работает без интернета, так как используется подключение к локальной сети;
* низкие требования к вычислительным ресурсам.

## Документация
Приложение будет доступно на http://localhost:3000/

После запуска вся документация будет доступна на http://localhost:8000/docs

Модель: https://github.com/stirk1337/machinist-assistant/blob/main/backend/model/model.py

Датасет: https://github.com/stirk1337/machinist-assistant/blob/main/backend/model/dataset.csv

## Запуск с docker-compose

Установите Docker (инструкция не прилагается)

Запустите приложение 

```console
root@stirk1337:~$ docker-compose up
```
Ждём установку docker-контейнера. Можем занять 5-10 минут.

## Запуск без docker-compose

Если у вас Windows

Установите Python с официального сайта https://www.python.org/

Установите node.js с официального сайта https://nodejs.org/ru

Если у вас Linux (например, Ubuntu)

Установите PIP

```console
root@stirk1337:~$ apt install python3 python3-pip
```

Установите Node.js

```console
root@stirk1337:~$ apt install nodejs
```

```console
root@stirk1337:~$ apt install npm
```

Установите зависимости для Python

```console
root@stirk1337:~$ pip install -r requirements.text
```
Перейдите в директорию frontend-server

```console
root@stirk1337:~$ cd frontend-server
```
Установите зависимости для React

```console
root@stirk1337:~$ npm install --force
```

Запустите frontend-server

```console
root@stirk1337:~$ npm start
```
Запустите backend-server

```console
root@stirk1337:~$ python3 backend/main.py
``
