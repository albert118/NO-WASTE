
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from . import views

# Personalized admin site settings like title and header
admin.site.site_title = "No-Waste Site Admin"
admin.site.site_header = "No-Waste Administration"

urlpatterns = [
    path("", views.HomePage.as_view(), name="home"),
    path("about/", views.AboutPage.as_view(), name="about"),
    path("admin/", admin.site.urls),
    path("elasticsearch/", include("elasticsearch.urls"), name="ElasticSearch")
] 
# User-uploaded files like profile pics need to be served in development
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if not settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

elif settings.DEBUG:
    # Include django debug toolbar if DEBUG is on
    import debug_toolbar
    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]