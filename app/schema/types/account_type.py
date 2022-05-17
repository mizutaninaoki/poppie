import graphene
from graphene_django import DjangoObjectType
from app.models.account import Account
from app.schema.types.company_type import CompanyType

# TODO: なぜかCustomUserTypeがimportできない。。。
# from app.schema.types.custom_user_type import CustomUserType


class AccountType(DjangoObjectType):
    class Meta:
        model = Account
        fields = (
            "id",
            "user",  # CustomUserTypeがimportできないため、fieldの中で定義
            "givable_point",
            "received_point",
            "created_at",
            "updated_at",
        )

    company = graphene.Field(graphene.NonNull(CompanyType))
    # user = graphene.Field(graphene.NonNull(CustomUserType))
