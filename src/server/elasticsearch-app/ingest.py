from elasticsearch import Elasticsearch, helpers
import json

def connect_elasticsearch():
    es = None
    es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
    if es.ping():
        print('Yay Connect')
    else:
        print('Awww it could not connect!')
    return es


with open('../recipe_db.json', "r", encoding="utf-8") as f:
  data = json.loads(f.read())
  

def bulkIngest():
    recipes = data
    print("Hit Me!")
    for interator, (recipe_key, recipe_value) in enumerate(recipes.items()):
        yield {
            "_index": "recipes",
            "id": interator,
            "title": recipe_value["title"],
            "instructions": recipe_value["instructions"],
            "ingredients": recipe_value["ingredients"],
        }


es = connect_elasticsearch()
helpers.bulk(es, bulkIngest())
es.close()