from django.contrib import admin
from .models import User, Profile
from django.apps import apps

admin.site.register(User)
admin.site.register(Profile)

# graphql_authによって追加されたモデルを管理画面に追加
app = apps.get_app_config("graphql_auth")

for model_name, model in app.models.items():
    admin.site.register(model)
