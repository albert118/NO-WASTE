from django.contrib import admin
from .models import Recipe, Item, Inventory, Author


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    pass


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    pass


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    pass


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    pass
