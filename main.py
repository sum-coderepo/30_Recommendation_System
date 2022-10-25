import uvicorn
from fastapi import FastAPI
from model import SentimentModel
from pydantic import BaseModel
app = FastAPI()
model = SentimentModel()


class Item(BaseModel):
    data: str

@app.post('/predict')

def predict(item: Item):
    print("data", item)
    embedding = model.get_sentiment(item.data)
    return {
        'embeddings_done' : embedding
    }

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8000)