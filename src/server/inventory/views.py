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
from .models import Item, User
# Create your views here.

class Inventory(View):
    """
    Author: Ryan Cleminson
    """
    allowed_methods = ['get', 'post', 'options']
    name = "Add Item View"

    def get(self, request, *args, **kwargs):
        
        for p in Item.objects.all():
            print(p.item_name)
        response = HttpResponse(Item, status = 200)
        return response

    def post(self, request, *args, **kwargs):
        content = json.loads(request.body.decode("utf-8")) # data comes in body, must be decoded.
        
        for p in Item.objects.all():
            print(p.headline)
        response = HttpResponse(Item, status = 200)
        return response

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