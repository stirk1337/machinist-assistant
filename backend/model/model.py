import subprocess

import whisper


class Converter:
    def __init__(self):
        pass


class Model:
    def __init__(self):
        pass

    @staticmethod
    def automated_speech_recognition(path: str) -> str:
        model = whisper.load_model('base')
        result = model.transcribe(f'model/mp3/{path}')

        return result['text']


assistant_model = Model()
converter = Converter()
