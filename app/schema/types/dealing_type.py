import graphene
from graphene_django import DjangoObjectType
from app.models.dealing import Dealing
from app.schema.types.company_type import CompanyType
from app.schema.types.account_type import AccountType


class DealingType(DjangoObjectType):
    class Meta:
        model = Dealing
        fields = (
            "id",
            "amount",
            "message",
            "created_at",
            "updated_at",
        )

    giver = graphene.Field(graphene.NonNull(AccountType))
    receiver = graphene.Field(graphene.NonNull(AccountType))
    company = graphene.Field(graphene.NonNull(CompanyType))
