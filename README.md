# SSD_S22_Project
This repo is for the course project of Software Development course IIIT S22.</br>

Dataset for this project is taken from </br>
https://www.kaggle.com/datasets/Cornell-University/arxiv

Contributors:-
1. Lokesh Sharma
2. Piysuh Singh
3. Mayush Kumar
4. Sumeet Agrawal

Motivation for this project is to create a fast Information Retrieval system of research papers using MERN Stack(UI), Elastic Search(retrieval) and Transformers(NLP).




1. Elastic Search</br>
    1.1 Installation</br>
    a. Download Elastic Search msi for windows.</br>
    b. Start elastic search server as ".\bin\elasticsearch.bat"</br>
    c. Reset elastic search password - .\bin\elasticsearch-reset-password.bat -u elastic.</br>

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
  
