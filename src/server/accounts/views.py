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
from django.http import HttpRequest, Http404, HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
# csrf and api logic
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
import json # for serialization and deserialization


class LoginView(View):
    allowed_methods = ['post', 'get', 'options']
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

    def get(self, request, *args, **kwargs):
        response = HttpResponse("http://localhost:3000/login/", status=301)
        response['Access-Control-Allow-Origin'] = '*'
        return response

    @method_decorator(never_cache)
    def options(self, request):
        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response.set_cookie("csfrtoken", get_token(request))


class ChangePasswordView(LoginRequiredMixin, View):
    allowed_methods = ['post', 'get', 'options']
    name = "Change Password View"
    # uncomment the following to override defaults set by settings associations
    # login_url = '/login/'
    # redirect_field_name = 'redirect_to'

    @method_decorator(never_cache)
    def get(self, request, *args, **kwargs):
        return HttpResponse(PasswordChangeForm(request.user), status=200)

    @method_decorator(never_cache)
    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # avoids logout -> login path. Quicker if we do this for the user!
            messages.success(request, "Password change successful!")
            return HttpResponse("Password change successful!", status=200)
        else:
            messages.error(request, "Please correct the error below.")
            return HttpResponseBadRequest("Form invalid!")

    @method_decorator(never_cache)
    def options(self, request):
        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response.set_cookie("csfrtoken", get_token(request))


class ChangePasswordDoneView(LoginRequiredMixin, View):
    allowed_methods = ['post', 'options']
    name = "Change Password Done View"
    # uncomment the following to override defaults set by settings associations
    # login_url = '/login/'
    # redirect_field_name = 'redirect_to'

    @method_decorator(never_cache)
    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        # if user is not None:
        #     login(request, user)  # updates Django session
        #     # send redirect to frontend page somehow... that'll be fucky
        #     return HttpResponse(data, status=200)
        # else:
        #     # not valid 40x page redirect, "try again?"
        #     HttpResponseBadRequest(str(user))
        return HttpResponseBadRequest("NOT DEFINED")

    @method_decorator(never_cache)
    def options(self, request):
        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response.set_cookie("csfrtoken", get_token(request))


class SignUpView(View):
    allowed_methods = ['get', 'post', 'options']
    name = "Sign Up View"
    signupURL = "accounts/registration/"

    def get(self, request, *args, **kwargs):
        return HttpResponse(str(UserCreationForm()))

    def post(self, request, *args, **kwargs):
        content = json.loads(request.body.decode("utf-8")) # data comes in body, must be decoded.
        form = UserCreationForm(content)
        if form.is_valid():
            form.save()
            return HttpResponse("sign up and login successful", status=200)
        else:
            return HttpResponseBadRequest(str(form.errors))

    @method_decorator(never_cache)
    def options(self, request):
        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response.set_cookie("csfrtoken", get_token(request))


class LogoutView(LoginRequiredMixin, View):
    # Excellent answer on whether GET or POST are to be used.
    # TL;DR => B O T H !!
    # "https://stackoverflow.com/a/3521391/9505707"
    allowed_methods = ['get', 'post' 'options']
    name = "Logout View"
    # uncomment the following to override defaults set by settings associations
    # login_url = '/login/'
    # redirect_field_name = 'redirect_to'

    @method_decorator(never_cache)
    def get(self, request, *args, **kwargs):
        if request:
            logout(request)
            return HttpResponse(request, status=200)
        else:
            return HttpResponseBadRequest("Invalid request")

    @method_decorator(never_cache)
    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        pass

    @method_decorator(never_cache)
    def options(self, request):
        response = HttpResponse()
        response['allow'] = ','.join(self.allowed_methods)
        return response.set_cookie("csfrtoken", get_token(request))


def csrf(request):
    return JsonResponse({ 'csrfToken': get_token(request) })

def ping(request):
    return JsonResponse({'result': 'OK'})
