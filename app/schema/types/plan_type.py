from graphene_django import DjangoObjectType
from app.models.plan import Plan


class PlanType(DjangoObjectType):
    class Meta:
        model = Plan
        fields = ("id", "name", "fee")
