from graphene_django import DjangoObjectType
from account.models import Profile


class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile
        fields = ("id", "user", "department", "comment", "created_at", "updated_at")
