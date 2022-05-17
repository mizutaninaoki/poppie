from graphene_django import DjangoObjectType
from app.models.plan import Plan


class PlanType(DjangoObjectType):
    # 返り値をclass単位ではない値を返したい時は以下のようにする
    # full_name = String()
    # https://docs.graphene-python.org/en/latest/types/objecttypes/
    class Meta:
        model = Plan
        fields = ("id", "name", "fee")
