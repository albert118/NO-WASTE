__doc__="""Author: Albert Ferguson.
Quick and easy, use the generic template views for Home & About page and add some custom React 'tests'. """

from django.views import generic, View
from django.shortcuts import render
from django.http import JsonResponse
from django.urls import get_resolver
def hello(request):
    """
    Author: Albert Ferguson
    Example Json request and response view. No fancy shit.
    """

    return JsonResponse({'response_text':'hello world!'})

def apiRoutes(request):
    """
    Author: Albert Ferguson
    Example Json request and response view, retrieves the URL patterns
    within Django.
    """

    routes = {}
    i = 0
    for key in get_resolver().reverse_dict.values():
        routes[i] = str(key[0])
        i += 1
    return JsonResponse(routes)

class HomePage(generic.TemplateView):
    """
    Author: Albert Ferguson
    Generic homepage view.
    """

    template_name = "home.html"

class AboutPage(View):
    """
    Author: Albert Ferguson
    Aboutpage view, but reconfigured from the generic templateview 
    for React integration testing. Includes custom "get"'r which returns
    context and props in a render.
    """

    template_name = "about.html"
    template      = template_name
    title         = "About"
    component     = "../../frontend/src/components/About.js"

    def get(self, request):
        props = {
            'nadda':'null',
        }

        context = {
            'title': self.title,
            'component': self.component,
            'props': props,
        }

        return render(request, self.template, context)