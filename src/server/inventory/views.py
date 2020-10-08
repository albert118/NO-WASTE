from django.views import generic, View
from django.shortcuts import render
from django.http import JsonResponse
from django.urls import get_resolver
from .models import Author
from django.core.serializers.json import DjangoJSONEncoder

### Probably need to use django rest framework as a new pip framework. 


# Create your views here.


def returnAuthor(request):
    # authors = 


## HTTP STUFF