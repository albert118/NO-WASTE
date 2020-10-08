from django.db import models

from elasticsearch import Elasticsearch

es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

# Create your models here.

def ElasticRequest(self, parameter_list):
    """
    Sample Request for getting data out of ElasticSearch.
    """
    pass

def ElasticIngest(self, parameter_list):
    """
    Sample ingest for getting data into ElasticSearch 
    """
    pass



