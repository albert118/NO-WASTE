from django.db import models  # DATABASE STUFF
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone
import uuid


class Inventory(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True
    )
    
class Author(models.Model):
    name          = models.CharField(max_length=100)
    title         = models.CharField(blank=False, max_length=30)

class Recipe(models.Model):
        
    recipe_name = models.CharField(max_length=100, default="")    
    purchase_date = models.DateField(blank=True, null=False, default=date.today())
    added_date    = models.DateField(default=date.today())
    total_cost    = models.FloatField(blank=True, null=False, default=0)
    purchase_location  = models.CharField(max_length=100) # -Albert MORE DESCRIPTIVE NAME?
    num_items     = models.IntegerField(default=0)

class Item(models.Model):
    expiry_date   = models.DateField(blank=False)
    added_date    = models.DateField(default=date.today())
    quantity      = models.IntegerField(default=1, blank=True, null=False)
    description   = models.CharField(blank=True, max_length=100, null=False, default="")
    cost          = models.FloatField(default=0, blank=True, null=False)
    receipt_id    = models.ForeignKey(Recipe, on_delete=models.CASCADE, default="")
    


class Item(models.Model):
    expiry_date   = models.DateField(blank=False)
    added_date    = models.DateField(default=date.today())
    quantity      = models.IntegerField(default=1, blank=True, null=False)
    description   = models.CharField(blank=True, max_length=100, null=False, default="")
    cost          = models.FloatField(default=0, blank=True, null=False)
    receipt_id    = models.ForeignKey(Recipe, on_delete=models.CASCADE, default="")
    

    description = models.CharField(
        default="... Who am I? What am I?!",
        blank=True,
        max_length=100,
        null=False
    )

    added_date = models.DateField(default=timezone.now, blank=False)
    prep_time_hours = models.FloatField(default=1, null=False, blank=True)
    cook_time_hours = models.FloatField(default=1, null=False, blank=True)
    num_serves = models.FloatField(default=1, null=False, blank=True)

    def __str__(self):
        return str(self.recipe_name)


class Item(models.Model):
    id                 = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item_name          = models.CharField(max_length=100, default="")
    added_date         = models.DateField(default=timezone.now)
    expiry_date        = models.DateField(blank=False)
    quantity           = models.IntegerField(default=1, blank=True, null=False)
    description        = models.CharField(blank=True, max_length=100, null=False, default="")
    cost               = models.FloatField(default=0, blank=True, null=False)
    inventory          = models.ForeignKey(Inventory, on_delete=models.SET_NULL, null=True)
    recipe_name        = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return str(self.item_name)

    class Meta:
        ordering = ['item_name', 'expiry_date']
