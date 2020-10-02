# the url patterns associated with the accounts app, if any of these are searched from the base urlpatterns
# in NO_WASTE/urls.py then they will end here.

from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('logout/', auth_views.LogoutView.as_view()),
    path('registration/', views.SignUpView.as_view()),
    path('updatePassword/', views.ChangePasswordView.as_view()),
    path('updatePasswordDone/', views.ChangePasswordDoneView.as_view()),
    path('csrf/', views.csrf),
    path('ping/', views.ping),
]
