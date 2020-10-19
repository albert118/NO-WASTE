# views and mixins
from django.views.generic import View

# Http req and res
from django.http import HttpRequest

# csrf and api logic
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect

# elastic search and abstract syntax tree libs
from elasticsearch import Elasticsearch
import ast



class Recipe(View):
    """
    Author Jayden Lee
    
    Recipe views via Elasticsearch. The Django Proxy implementation.
    """

    allowed_methods = ["get", "options"]

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

    def options(self, request, *args, **kwargs):
        """
        Author: Albert Ferguson
        
        Returns the options allowed for the current view.
        """

        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response

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

