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


# Create your views here.


class Recipe(View):
	""" Author Jayden Lee"""

	def get(self, request, *args, **kwargs):
		listOfObjects = (1,2,3)

		Recipes = {
			"name": "",
			"ingredients": "",
			"instructions": "",
		}
		
		responseObject = {
			"time": timezone.now(),
			"Recipes": listOfObjects,
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


def csrf(request):
	return JsonResponse({ 'csrfToken': get_token(request) })

def ElasticQuuery(request):
	if request.method == 'POST':
		print(request.QUERY_STRING())
		pass
	elif request.method == 'GET':
		pass
	return JsonResponse