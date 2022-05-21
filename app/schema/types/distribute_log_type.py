import graphene
from graphene_django import DjangoObjectType
from app.models.distribute_log import DistributeLog
from app.schema.types.company_type import CompanyType
from app.schema.types.account_type import AccountType


class DistributeLogType(DjangoObjectType):
    class Meta:
        model = DistributeLog
        fields = (
            "id",
            "point",
            "created_at",
            "updated_at",
        )

    company = graphene.Field(graphene.NonNull(CompanyType))
    account = graphene.Field(graphene.NonNull(AccountType))
