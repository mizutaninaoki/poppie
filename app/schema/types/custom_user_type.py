import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from app.schema.types.company_type import CompanyType
from app.schema.types.account_type import AccountType
from app.schema.types.profile_type import ProfileType

# UserTypeという名前ではGraphQL Authの関係で定義できない(passwordがないと怒られる)
# TODO: passwordを返すのはよくない。passwordは返さないようにしたい。
class CustomUserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        fields = ("id", "name", "password", "email", "is_active", "is_admin")

    company = graphene.Field(graphene.NonNull(CompanyType))
    profile = graphene.Field(graphene.NonNull(ProfileType))
    account = graphene.Field(graphene.NonNull(AccountType))
