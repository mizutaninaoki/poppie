import graphene
from graphql_auth.schema import UserQuery, MeQuery
from account.schema import AuthMutation, UserMutation, CompanyUsersQuery

#
# Resolvers
#
from app.schema.resolvers.plans.plan_query import PlanQuery
from app.schema.resolvers.profiles.profile_query import ProfileQuery
from app.schema.resolvers.accounts.accounts_query import AccountQuery

# users
from app.schema.resolvers.users.user_give_dealings_query import (
    UserGiveDealingsQuery,
)
from app.schema.resolvers.users.user_receive_dealings_query import (
    UserReceiveDealingsQuery,
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


class Query(
    MeQuery,
    UserQuery,
    UserGiveDealingsQuery,
    UserReceiveDealingsQuery,
    CompanyUsersQuery,
    PlanQuery,
    ProfileQuery,
    AccountQuery,
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
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
