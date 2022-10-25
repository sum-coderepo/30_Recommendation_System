# SSD_S22_Project
This repo is for the course project of Software Development course IIIT S22.


Elastic Search
1. Download Elastic Search msi for windows.
2. Start elastic search server as ".\bin\elasticsearch.bat"
3. Reset elastic search password - .\bin\elasticsearch-reset-password.bat -u elastic.

1. Test Elastic search API:

https://localhost:9200/ssd-search/_mapping
https://localhost:9200/ssd-search/_search
https://localhost:9200/ssd-search/_search?pretty=true&q=*:*
https://localhost:9200/ssd-search/_count


Sample query to Search (Not the vectorised embeddings)
nyc-restaurants/_search
{
    "query": {
        "match": {
            "_id": "50127304"
        }
 }
 
 2. Using Faiss
    Run main.py
   
  Testing using postman
  POST http://localhost:8000/predict
  {
    "data": "Polymer Quantum Mechanics and its Continuum Limit A rather non-standard quantum representation of the canonicale"
}
  
