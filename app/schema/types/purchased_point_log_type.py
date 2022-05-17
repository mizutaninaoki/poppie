from graphene_django import DjangoObjectType
from app.models.purchased_point_log import PurchasedPointLog


class PurchasedPointLogType(DjangoObjectType):
    class Meta:
        model = PurchasedPointLog
        fields = (
            "id",
            "company",
            "point",
            "price",
            "created_at",
            "updated_at",
        )
