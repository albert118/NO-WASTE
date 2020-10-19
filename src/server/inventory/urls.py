
  
# the url patterns associated with the accounts app, if any of these are searched from the base urlpatterns
# in NO_WASTE/urls.py then they will end here.

from django.urls import path
from django.contrib.auth import views as auth_views
from . import views


app_name = "inventory"
urlpatterns = [
    path('all/', views.All.as_view()),
    path('allAlphaOrdering/', views.AlphabeticOrder.as_view())
]
