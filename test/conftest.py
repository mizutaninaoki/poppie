import pytest
from pytest_factoryboy import register
from graphql_jwt.shortcuts import get_token

from factories.plans import PlanFactory
from factories.companies import CompanyFactory
from factories.dealings import DealingFactory
from factories.distribute_logs import DistributeLogFactory
from factories.items import ItemFactory
from factories.exchange_applied_items import ExchangeAppliedItemFactory
from factories.exchanged_item_logs import ExchangedItemLogFactory
from factories.purchased_point_logs import PurchasedPointLogFactory

register(PlanFactory)
register(CompanyFactory)
register(DealingFactory)
register(DistributeLogFactory)
register(ItemFactory)
register(ExchangeAppliedItemFactory)
register(ExchangedItemLogFactory)
register(PurchasedPointLogFactory)

from pdb import set_trace as st


@pytest.fixture(autouse=True)
def test_generate_plan_fixtures(plan_factory):
    plan_factory.create(name="free", fee=0)
    plan_factory.create(name="standard", fee=2000)
    plan_factory.create(name="professional", fee=5000)
    assert True


@pytest.fixture
def company_fixture(company_factory):
    return company_factory.create(point=1000)


@pytest.fixture
def create_user_fixture(django_user_model):
    """
    userが作成される時に、同時にaccountとprofileも作成される
    """

    def make_user(**kwargs):
        return django_user_model.objects.create_user(**kwargs)

    return make_user


# from graphql_jwt.testcases import JSONWebTokenTestCase, JSONWebTokenClient
# @pytest.fixture
# def logged_in_client_fixture(company_fixture, create_user_fixture):
#     user = create_user_fixture(
#         email="user@test.jp",
#         password="test_password",
#         company=company_fixture,
#         is_active=True,
#         is_admin=True,
#     )

#     client = JSONWebTokenTestCase().client_class()
#     client.authenticate(user)
#     return client, user


@pytest.fixture
def logged_in_client_fixture(company_fixture, create_user_fixture):
    """ログイン済みユーザーのfixture"""
    user = create_user_fixture(
        email="user@test.jp",
        password="test_password",
        company=company_fixture,
        is_active=True,
        is_admin=True,
    )

    headers = {"HTTP_AUTHORIZATION": f"JWT {get_token(user)}"}

    return user, headers
