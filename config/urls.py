from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.conf.urls.static import static
import os

urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]

debug = os.environ.get("DEBUG")
media_url = os.environ.get("MEDIA_URL")
media_root = os.environ.get("MEDIA_ROOT")

if debug:
    urlpatterns += static(media_url, document_root=media_root)
