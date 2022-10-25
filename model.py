from functools import cached_property,lru_cache


from sentence_transformers import SentenceTransformer
import pickle
from datasets import Dataset
import pandas as pd
import numpy as np

run_once = False
comments_dataset_global = None

class SentimentModel:

    def get_sentiment(self, text):
        model = SentenceTransformer('sentence-transformers/paraphrase-MiniLM-L6-v2')
        embeddings = model.encode(text)
        comments_dataset = self.getEmbedding
        scores, samples = comments_dataset.get_nearest_examples(
            "vector", embeddings, k=3
        )
        return samples['Unnamed: 0']


    def convert(self, item):
        item = item.strip()  # remove spaces at the end
        item = item[1:-1]    # remove `[ ]`
        item = np.fromstring(item, sep=' ')  # convert string to `numpy.array`
        return item

    @cached_property
    def getEmbedding(self):
        global comments_dataset_global
        print("hkhskhkhs")
        dataset = pd.read_csv("D:\\arxiv dump\\Embeddings/sample_100.csv")
        dataset['vector'] = dataset['embeddings'].apply(self.convert)
        comments_dataset = Dataset.from_pandas(dataset)
        comments_dataset.add_faiss_index(column="vector")
        return comments_dataset



# obj = SentimentModel()
# print(obj.get_sentiment("Polymer Quantum Mechanics and its Continuum Limit A rather non-standard quantum representation of the canonicale"))