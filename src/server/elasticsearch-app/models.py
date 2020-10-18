from django.db import models

# Create your models here.

from django.db import models  # DATABASE STUFF
from datetime import date
from django.conf import settings
from django.contrib.auth.models import User


class Recipe(models.Model):
    title        = models.CharField(blank=False, max_length=100)
    ingredients  = models.CharField(blank=False, max_length=500)
    instructions = models.CharField(blank=False, max_length=500)
    




