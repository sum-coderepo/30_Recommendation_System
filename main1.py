import uvicorn
from fastapi import FastAPI
from model import SentimentModel
from pydantic import BaseModel
app = FastAPI()
model = SentimentModel()


class Item(BaseModel):
    query: str
    link: str

@app.post('/predict')

def predict(item: Item):
    print("data", item)
    embedding = model.get_embeddings(item.query)
    elastic_result = model.elasticSearch(embedding.numpy())
    #print(embedding)
    print(elastic_result)
    print()
    return {
        'embeddings_done' : elastic_result.body['hits']['hits']
    }

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8004)
