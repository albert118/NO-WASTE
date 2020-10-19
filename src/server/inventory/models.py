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

    # def __str__(self):
    #     return "{USR_NAME}'s inventory"


class Recipe(models.Model):
    recipe_name = models.CharField(default="", max_length=100, blank=False)

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
