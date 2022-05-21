import graphene
from graphene_django import DjangoObjectType
from app.models.purchased_point_log import PurchasedPointLog
from app.schema.types.company_type import CompanyType


class PurchasedPointLogType(DjangoObjectType):
    class Meta:
        model = PurchasedPointLog
        fields = (
            "id",
            "point",
            "price",
            "created_at",
            "updated_at",
        )

    company = graphene.Field(graphene.NonNull(CompanyType))
