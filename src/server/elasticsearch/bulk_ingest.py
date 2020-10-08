import csv
from os.path import abspath, join, dirname, exists
import urllib3
from elasticsearch import Elasticsearch
from elasticsearch.helpers import streaming_bulk

