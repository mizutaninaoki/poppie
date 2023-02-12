import logging
import graphene
from graphql_jwt.decorators import login_required
from account.models import Account
from app.schema.types.account_type import AccountType


class AccountQuery(graphene.ObjectType):
    accounts = graphene.List(
        graphene.NonNull(AccountType),
        required=True,
        description="アカウント一覧取得",
    )

    @login_required
    def resolve_accounts(root, info):
        return Account.objects.select_related("user", "company").filter(
            company_id=info.context.user.company.id
        )
