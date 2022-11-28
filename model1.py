from functools import cached_property,lru_cache
from elasticsearch import Elasticsearch, helpers

from transformers import AutoTokenizer, TFAutoModel
from sentence_transformers import SentenceTransformer
import pickle
import pandas as pd
import numpy as np
import torch
run_once = False
comments_dataset_global = None

class SentimentModel:
    def __init__(self):

        self.model_ckpt = "sentence-transformers/all-MiniLM-L12-v2"
        self.model = TFAutoModel.from_pretrained(self.model_ckpt, from_pt=True)

        self.tokenizer = AutoTokenizer.from_pretrained(self.model_ckpt)



    def cls_pooling(self, model_output):
        return model_output.last_hidden_state[:, 0]


    def get_embeddings(self, text_list):
        encoded_input = self.tokenizer(text_list, padding=True, truncation=True, return_tensors="tf")
        encoded_input = {k: v for k, v in encoded_input.items()}
        with torch.no_grad():
            model_output = self.model(**encoded_input)
        return self.cls_pooling(model_output)

    def elasticSearch(self, question_embedding):
        client = Elasticsearch(['https://localhost:9200'], http_auth=('elastic', 'P_YhQNcMjc36xSELpgzJ'), verify_certs=False)
        script_query = {
            "script_score": {
                "query": {"match_all": {}},
                "script": {
                    "source": "cosineSimilarity(params.query_vector, 'embeddings' ) + 1.0",
                    "params": {"query_vector": question_embedding[0]}
                }
            }
        }
        ss = client.search(
            index="ssd-search",
            body={
                "size": 10,
                "query": script_query,
                "_source": {"includes": ["id","title", "abstract", "update_date", "Authors" ,"categories", "paper_id"]}
            }
        )
        return ss

    def getResult(self, question):
        print("question", question)
        question_embedding = self.get_embeddings(question)
        elastic_result = self.elasticSearch(question_embedding.numpy())
        return elastic_result

if __name__ == '__main__':
    model = SentimentModel()
    els = model.getResult("Transfer learning Deep learning")


    print(els)
    print(els.body['hits']['hits'])



