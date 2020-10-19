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

from elasticsearch import Elasticsearch
import ast



class Recipe(View):
    """
    Author Jayden Lee
    
    Recipe views via Elasticsearch. The Django Proxy implementation.
    """
    def __init__(self, *args, **kwargs):
        # default config
        ip_default = "127.0.0.1"
        port_default = 9200

        if ("ip" in kwargs.keys):
            self.ip = str(kwargs["ip"])
        else:
            self.ip = ip_default
        
        if ("port" in kwargs.keys):
            self.port = int(kwargs["port"])
        else:
            self.port = port_default
        
        self.es = Elasticsearch([{'host': self.ip, "port": self.port}])

    @method_decorator(login_required)
    @method_decorator(csrf_protect)
    def get(self, request, *args, **kwargs):
        # declare a list to hold query terms.
        pantryContent = list()
        # get the current logged in user from request and get their inventory.
        usr = User.objects.get(username=str(request.user))
        usr_inv_listofDicts = Inventory.objects.get(user=usr).item_set.all().values()

        for i in range(len(usr_inv_listofDicts)):
            # item UUID4 is id for every item entered into response.
            pantryContent.append(usr_inv_listofDicts[i]["item_name"])

        recipe_search_query = self._buildRecipesQuery(pantryContent)

        recipe_search = self.es.search(index="recipes", body=recipe_search_query)
        recipe_search = str(recipe_search)
        recipe_search = ast.literal_eval(recipe_search)
        return JsonResponse(recipe_search, status = 200)


    def _buildRecipesQuery(inventoryList, keywords=None, *args, **kwargs):
        """
        Author: Jayden Lee

        Build the query per ingredient to match. Appyling pagination.
        """

        match = list()

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

