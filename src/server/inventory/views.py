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

# response
# for serialization and deserialization
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
import json

from django.shortcuts import render
from django.urls import get_resolver
from django.utils import timezone
from .models import Item, User, Inventory

##########################
# Create your views here.
##########################

class All(View):
    """
    Author: Ryan Cleminson
    Author: Albert Ferguson

    Get all view.
    """

    allowed_methods = ["get", "options"]

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        """
        Author: Albert Ferguson
    
        Get all view. Simply serializer.
        """
        # empty response object
        response_dict = dict()
        # get the current logged in user from request.
        usr = User.objects.get(username=str(request.user))
        # get their inventory
        usr_inv_listofDicts = Inventory.objects.get(user=usr).item_set.all().values()

        for i in range(len(usr_inv_listofDicts)):
            # item UUID4 is id for every item entered into response.
            response_dict[str(usr_inv_listofDicts[i]["id"])] = {
                "title": usr_inv_listofDicts[i]["item_name"],
                "added_date": usr_inv_listofDicts[i]["added_date"],
                "expiry_date": usr_inv_listofDicts[i]["expiry_date"],
                "quantity": usr_inv_listofDicts[i]["quantity"],
                "description": usr_inv_listofDicts[i]["description"],
                "cost": usr_inv_listofDicts[i]["cost"]
            }

        return JsonResponse(response_dict, status=200)


    def options(self, request):
        """
        Author: Ryan Cleminson
        
        Returns the options allowed for the current view.
        """

        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response


class AlphabeticOrder(View):
    """
    Author: Albert Ferguson

    Get ordered view.
    """

    allowed_methods = ["get", "options"]

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        """
        Author: Albert Ferguson
    
        Get all view. Simple ordered serializer.
        """

        all_dict = dict()
        data = Recipe.objects.values_list("recipe_name", "added_date")
        for i in range(len(data)):
            all_dict[i] = data[i]

        return JsonResponse(all_dict, status=200)

    def options(self, request):
        """
        Author: Albert Ferguson
        
        Returns the options allowed for the current view.
        """

        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response