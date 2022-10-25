# SSD_S22_Project
This repo is for the course project of Software Development course IIIT S22.


1. Elastic Search
    1.1 Installation
    a. Download Elastic Search msi for windows.
    b. Start elastic search server as ".\bin\elasticsearch.bat"
    c. Reset elastic search password - .\bin\elasticsearch-reset-password.bat -u elastic.

    1.2 Test Elastic search API:

    https://localhost:9200/ssd-search/_mapping </br>
    https://localhost:9200/ssd-search/_search </br>
    https://localhost:9200/ssd-search/_search?pretty=true&q=*:* </br>
    https://localhost:9200/ssd-search/_count </br>
    
    1.3 Search using POSTMAN
    
    Sample query to Search (Not the vectorised embeddings)
    nyc-restaurants/_search
    {</br>
        "query": {</br>
            "match": {</br>
                "_id": "50127304"</br>
            }</br>
     }</br>
 
 2. Using Faiss
    Run main.py
   
  Testing using postman</br>
  POST http://localhost:8000/predict</br>
  {</br>
    "data": "Polymer Quantum Mechanics and its Continuum Limit A rather non-standard quantum representation of the canonicale"</br>
    }</br>
  
