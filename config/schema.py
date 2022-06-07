import graphene
from graphql_auth.schema import UserQuery, MeQuery
from account.schema import AuthMutation, UserMutation, CompanyUsersQuery

#
# Resolvers
#
from app.schema.resolvers.plans.plan_query import PlanQuery
from app.schema.resolvers.profiles.profile_query import ProfileQuery
from app.schema.resolvers.accounts.accounts_query import AccountQuery
from app.schema.resolvers.items.item_query import ItemQuery
from app.schema.resolvers.items.items_query import ItemsQuery

# users
from app.schema.resolvers.users.user_gave_dealings_query import (
    UserGaveDealingsQuery,
)
from app.schema.resolvers.users.user_received_dealings_query import (
    UserReceivedDealingsQuery,
)

#
# Mutations
#
from app.schema.mutations.plans.update_plan import PlanMutation
from app.schema.mutations.profiles.update_profile import ProfileMutation
from app.schema.mutations.companies.create_company_and_admin_user import CompanyMutation
from app.schema.mutations.dealings.create_dealing import DealingMutation
from app.schema.mutations.purchases.create_purchase_point import PurchaseMutation
from app.schema.mutations.distributes.create_distributes import DistributeMutation
from app.schema.mutations.items.create_item import CreateItemMutation
from app.schema.mutations.items.update_item import UpdateItemMutation
from app.schema.mutations.exchanges.create_or_update_exchange_applied_items import (
    CreateOrUpdateExchangeAppliedItemsMutation,
)

from app.schema.mutations.utils.generate_s3_presigned_url import (
    GenerateS3PresignedUrlMutation,
)


class Query(
    MeQuery,
    UserQuery,
    UserGaveDealingsQuery,
    UserReceivedDealingsQuery,
    CompanyUsersQuery,
    PlanQuery,
    ProfileQuery,
    AccountQuery,
    ItemQuery,
    ItemsQuery,
    graphene.ObjectType,
):
    pass


class Mutation(
    AuthMutation,
    UserMutation,
    PlanMutation,
    ProfileMutation,
    CompanyMutation,
    DealingMutation,
    PurchaseMutation,
    DistributeMutation,
    CreateItemMutation,
    UpdateItemMutation,
    CreateOrUpdateExchangeAppliedItemsMutation,
    GenerateS3PresignedUrlMutation,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
