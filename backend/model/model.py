import pandas as pd
import sentence_transformers
import nemo.collections.asr as nemo_asr


class Model:
    """
    A class that represents an AI model for providing solutions to specific problems.

    Attributes:
        stt_model (whisper.Model): The automatic speech recognition model.
        main_model (sentence_transformers.SentenceTransformer): The sentence embeddings model.
        dataset (pandas.DataFrame): A DataFrame containing problem-failure-solution data.

    Methods:
        __init__(self, dataset_path: str):
            Initializes the Model instance with the provided dataset.

        get_solution(self, fail: str) -> (str, str):
            Retrieves the reason and solution associated with a specific failure.

        give_solution(self, question: str) -> list[(str, str)]:
            Provides solutions to similar problems based on semantic similarity.

        automated_speech_recognition(self, path: str) -> str:
            Performs automated speech recognition on an audio file.

    """

    def __init__(self, dataset_path: str):
        self.stt_model = nemo_asr.models.EncDecRNNTBPEModel.from_pretrained(
            "nvidia/stt_ru_fastconformer_hybrid_large_pc")
        self.main_model = sentence_transformers.SentenceTransformer('inkoziev/sbert_synonymy')
        self.dataset = pd.read_csv(dataset_path, sep=';')

    def get_solution(self, fail: tuple[str, float]) -> (str, str):
        """
        Retrieve the reason and solution associated with a specific failure.

        Args:
            fail (str): The failure description.

        Returns:
            Tuple[str, str]: A tuple containing the reason and solution for the specified failure.
        """
        df = self.dataset[self.dataset['failure'] == fail[0]]

        for index, row in df.iterrows():
            return {'id': row['id'],
                    'accuracy': fail[1],
                    'fail': fail[0],
                    'reason': row['reason'],
                    'solution': row['solution']}

    def give_solution(self, question: str) -> list[(str, str)]:
        """
        Provide solutions to similar problems based on semantic similarity.

        Args:
            question (str): The user's query or problem description.

        Returns:
            List[Tuple[str, str]]: A list of tuples containing the reason and solution for similar problems.
        """
        problems = []
        for index, row in self.dataset.iterrows():
            if row['failure'] not in problems:
                problems.append(row['failure'])
        problems.insert(0, question)
        embeddings = self.main_model.encode(problems)

        threshold = 0.65
        most_common = []
        given = embeddings[0]

        for i in range(1, len(embeddings)):
            s = sentence_transformers.util.cos_sim(a=given, b=embeddings[i]).item()
            if s > threshold:
                most_common.append((problems[i], s))
        most_common.sort(key=lambda x: x[1], reverse=True)
        return [self.get_solution(x) for x in most_common]

    def automated_speech_recognition(self, path: str) -> str:
        """
        Perform automated speech recognition on an audio file.

        Args:
            path (str): The path to the audio file.

        Returns:
            str: The transcribed text from the audio.
        """
        result1 = self.stt_model.transcribe([f'model/mp3/{path}'])
        return result1[0][0]


# Create an instance of the Model class with a dataset
assistant_model = Model('model/dataset.csv')
