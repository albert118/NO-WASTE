from django.db import models
from datetime import date

class Author: 
## DATABASE STUFF
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    name = models.CharField(max_length=100)
    title = models.CharField(blank=True, max_length=3)

# Create your models here.
class Recipe: 
## DATABASE STUFF
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    purchase_date = models.DateField(blank=True, null=True)
    added_date = models.DateField(default=date.today)
    total_cost = models.FloatField(blank=True, null=True)
    purchase_icc = models.CharField(max_length=100)
    num_items = models.IntegerField(default=0)

class Item: 
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    expiry_date =  models.DateField(blank=True, null=True)
    added_date =  models.DateField(default=date.today)
    quantity =  models.IntegerField(default=0)
    description = models.CharField(blank=True, max_length=100, null=True)
    cost = models.FloatField(blank=True, null=True)
    receipt_id = models.ForeignKey(on_delete=models.deletion.CASCADE, to='inventory.Recipe')


class Inventory:
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    num_items = models.IntegerField(blank=True, default=0, null=True)
    is_empty = models.BooleanField(default=1, null=False, blank=False)
    item_id = models.ForeignKey(on_delete=models.deletion.CASCADE, to='inventory.Item')
    user_id = models.ForeignKey(on_delete=models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)