from django.views import generic, View
from django.shortcuts import render
from django.http import JsonResponse
from django.urls import get_resolver
from . import models
from elasticsearch import Elasticsearch
from rest_framework.decorators import api_view


# Create your views here.


def ElasticIngest(request):
   """
    Sample Request for getting data out of ElasticSearch.
    """
    pass

def ElasticRequest(request):
    """
    Author: 
    Jayden Lee

    """
    pass

    