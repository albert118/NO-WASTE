# views and mixins
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView, View

# authentication and session
from django.contrib.auth import authenticate, login, logout  # Auth built in functions
from django.contrib.auth import update_session_auth_hash # update for session 
from django.contrib import messages

# forms and more builtins
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm

# Http req and res
from django.http import HttpRequest, Http404, HttpResponse, HttpResponseBadRequest
# csrf and api logic
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
import json # for serialization and deserialization

from django.shortcuts import render
from django.urls import get_resolver
from django.utils import timezone
# Create your views here.
from . import models
from elasticsearch import Elasticsearch
from inventory.models import Item, User, Inventory
import ast


# Create your views here.


class Recipe(View):
    """ Author Jayden Lee"""
    def __init__(self):
        self.es = Elasticsearch([{'host': '127.0.0.1', 'port': 9200}])

    def get(self, request, *args, **kwargs):

        pantryContent = []
        # get the current logged in user from request.
        usr = User.objects.get(username=str(request.user))
        # get their inventory
        usr_inv_listofDicts = Inventory.objects.get(user=usr).item_set.all().values()

        for i in range(len(usr_inv_listofDicts)):
            # item UUID4 is id for every item entered into response.
            pantryContent.append(usr_inv_listofDicts[i]["item_name"])

        recipe_search_query = buildRecipesQuery(pantryContent)

        recipe_search = self.es.search(index="recipes", body=recipe_search_query)
        recipe_search = str(recipe_search)
        recipe_search = ast.literal_eval(recipe_search)
        return JsonResponse(recipe_search, status = 200)

    def post(self, request, *args, **kwargs):

        return HttpResponse(str("hi"), status = 200)


def csrf(request):
    return JsonResponse({ 'csrfToken': get_token(request) })

def buildRecipesQuery(inventoryList, keywords=None, *args, **kwargs):
    # query = {
    #     'query': {
    #         'multi_match': 
    #         {'query': inventoryList, 
    #         'fields': "ingredients"}
    #     }
    # }
    match = []

    for i in range(len(inventoryList)):
        match.append(
            {
            'match': { 
                "ingredients": {'query': inventoryList[i]}
                }
            }
        )

    query = {
        'query': {
            'bool': {
                'should': match
            }
        },
        'size': 10
    }

    return query

