from django.views import generic, View
from django.shortcuts import render
from django.http import JsonResponse
from django.urls import get_resolver
from . import models
from elasticsearch import Elasticsearch 

# Create your views here.


def ingest(request):
    """
    Author: Jayden Lee
    Example: Just checking an example response. 
    """
    es = Elasticsearch()



def search(request):
    """
    Author: 
    Jayden Lee

    """

    