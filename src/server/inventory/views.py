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
from .models import Item, User
# Create your views here.

class Inventory(View):
    """
    Author: Ryan Cleminson + Jayden Lee
    """

    def get(self, request, *args, **kwargs):
        listOfObjects = list()

        ItemObject = {
            "name": "",
            "expiry_date": "",
            "added_date": "",
            "quantity": 0,
            "description": "",
            "cost": float(0),
        }
        
        for i in Item.objects.all():
            toAppendObject = dict(ItemObject)
            toAppendObject["name"] = i.item_name
            toAppendObject["quantity"] = int(i.quantity)
            toAppendObject["cost"] = float(i.cost)
            listOfObjects.append(toAppendObject)
        
        responseObject = {
            "time": timezone.now(),
            "recipies": listOfObjects,
        }

        return JsonResponse(responseObject, status = 200)

    def post(self, request, *args, **kwargs):
        return HttpResponse(str("hi"), status = 200)

        # form = InventoryForm(content)
        # if form.is_valid():
        #     form.save()
        #     return HttpResponse("successfully added item", status=200)
        # else:
        # return HttpResponseBadRequest("U FUCKED UP")

    def options(self, request):
        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response.set_cookie("csfrtoken", get_token(request))

def csrf(request):
    return JsonResponse({ 'csrfToken': get_token(request) })

def ping(request):
    return JsonResponse({'result': 'OK'})