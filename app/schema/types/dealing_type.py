import graphene
from graphene_django import DjangoObjectType
from app.models.dealing import Dealing
from app.schema.types.company_type import CompanyType


class DealingType(DjangoObjectType):
    class Meta:
        model = Dealing
        fields = (
            "id",
            "giver",
            "receiver",
            "amount",
            "message",
            "created_at",
            "updated_at",
        )

    company = graphene.Field(graphene.NonNull(CompanyType))
