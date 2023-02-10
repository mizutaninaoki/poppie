import pytest
from pytest_factoryboy import register

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


@pytest.fixture(autouse=True)
def test_generate_plan_fixtures(plan_factory):
    plan_factory.create(name="free")
    plan_factory.create(name="standard")
    plan_factory.create(name="professional")
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
