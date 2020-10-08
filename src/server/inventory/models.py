from django.db import models  # DATABASE STUFF
from datetime import date
from django.conf import settings
from django.contrib.auth.models import User


class Author(models.Model):
    name          = models.CharField(max_length=100)
    title         = models.CharField(blank=False, max_length=30)


class Recipe(models.Model):
    purchase_date = models.DateField(blank=True, null=False, default=date.today())
    added_date    = models.DateField(default=date.today())
    total_cost    = models.FloatField(blank=True, null=False, default=0)
    purchase_icc  = models.CharField(max_length=100) # -Albert MORE DESCRIPTIVE NAME?
    num_items = models.IntegerField(default=0)
    # -Albert NEEDS ITEMS TO REFERENCE


class Item(models.Model):
    expiry_date   = models.DateField(blank=False)
    added_date    = models.DateField(default=date.today())
    quantity      = models.IntegerField(default=1, blank=True, null=False)
    description   = models.CharField(blank=True, max_length=100, null=False, default="")
    cost          = models.FloatField(default=0, blank=True, null=False)
    receipt_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    
    # -Albert needs a Meta class for a name, otherwise the name on the form 
    # shows up as Item Object 1


class Inventory(models.Model):
    num_items     = models.IntegerField(blank=True, default=0, null=True)
    is_empty      = models.BooleanField(default=1, null=False, blank=False)
    item_id       = models.ForeignKey(Item, on_delete=models.CASCADE)
    user_id       = models.ForeignKey(User, on_delete=models.CASCADE)