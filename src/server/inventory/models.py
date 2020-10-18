from django.db import models  # DATABASE STUFF
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone


class Item(models.Model):
    item_name          = models.CharField(max_length=100, default="")
    added_date         = models.DateField(default=timezone.now)
    expiry_date        = models.DateField(blank=False)
    quantity           = models.IntegerField(default=1, blank=True, null=False)
    description        = models.CharField(blank=True, max_length=100, null=False, default="")
    cost               = models.FloatField(default=0, blank=True, null=False)
    
    def __str__(self):
        return str(self.item_name)


class Recipe(models.Model):
    recipe_name        = models.CharField(default="", max_length=100, blank=False)
    ingrediant_id      = models.ManyToManyField(Item)

    description = models.CharField(
        default="... Who am I? What am I?!",
        blank=True,
        max_length=100,
        null=False
    )

    added_date         = models.DateField(default=timezone.now, blank=False)
    prep_time_hours    = models.FloatField(default=1, null=False, blank=True)
    cook_time_hours    = models.FloatField(default=1, null=False, blank=True)
    num_serves         = models.FloatField(default=1, null=False, blank=True)
    
    def __str__(self):
        return str(self.recipe_name)


class Inventory(models.Model):
    user_id            = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True
    )

    is_empty           = models.BooleanField(default=1, null=False, blank=False)
    item_id            = models.ManyToManyField(Item)
    
    def __str__(self):
        return "{USR_NAME}'s inventory".format(USR_NAME=self.user_id.first_name)
