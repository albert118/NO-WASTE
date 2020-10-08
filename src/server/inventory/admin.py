from django.contrib import admin

# Register your models here.

## ADMIN VIEW OF PAGE

from inventory.models import Author

class AuthorAdmin(admin.ModelAdmin):
    pass
admin.site.register(Author, AuthorAdmin)