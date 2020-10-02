# Create your views here.
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView, View

from django.contrib.auth import authenticate, login  # Auth built in functions
from django.contrib.auth import update_session_auth_hash # update for session 
# Http req and res
from django.http import HttpRequest, Http404, HttpResponse, HttpResponseBadRequest
# csrf and api logic
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
import json

class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = "accounts/dashboard.html"


class LoginView(View):
    allowed_methods = ['post', 'options']
    name = "Login View"

    @method_decorator(never_cache)
    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        data = json.loads(request.headers["Authorization"])
        # authenticate against the db
        user = authenticate(request, username=data["username"], password=data["password"])
        if user is not None:
            # updates Django session
            login(request, user)
            # construct a HTTP response to return
            return HttpResponse(data, status=200)
        else:
            # user login failed but authentication passed? IDK must be a bad request
            return HttpResponseBadRequest(str(user))

    def options(self, request):
        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response.set_cookie("csfrtoken", get_token(request))

def ChangePassword(request):
    if request.method == "POST":
        form = PassWordChangeForm(user=request.user, data=request.POST)  # we dont want to do this, calls Django's built in form and tempalte attached
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
    else:
        # gen an error for bad login: 403 unauthorised
        pass
    username = request.POST['username']
    password = request.POST['password']
    # authenticate against the db
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)  # updates Django session
        # send redirect to frontend page somehow... that'll be fucky
    else:
        # not valid 40x page redirect, "try again?". Again this'll be fucky
        pass    

    # no return needed, redirect is the outcome. No JSON response needed
    # probs better to return the request with header for updated paths and HTTP
    # code surely? Might save fuckery in redirects...
    return

def csrf(request):
    return JsonResponse({ 'csrfToken': get_token(request) })

def ping(request):
    return JsonResponse({'result': 'OK'})
