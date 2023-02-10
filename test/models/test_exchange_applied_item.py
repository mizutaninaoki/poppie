import pytest
from app.models.exchange_applied_item import ExchangeAppliedItem


@pytest.fixture(scope="function", autouse=True)
def exchange_applied_item_fixture(
    company_fixture, create_user_fixture, item_factory, exchange_applied_item_factory
):
    user = create_user_fixture(
        email="test1@test.jp", password="test_password", company=company_fixture
    )

    item = item_factory.create(quantity=100, company=company_fixture)
    exchange_applied_item_factory.create(quantity=1, user=user, item=item)
    exchange_applied_item_factory.create(quantity=2, user=user, item=item)


@pytest.mark.django_db
def test_exchange_applied_item_count():
    count = ExchangeAppliedItem.objects.all().count()
    assert count == 2
