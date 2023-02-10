import pytest
from app.models.exchanged_item_log import ExchangedItemLog


@pytest.fixture(scope="function", autouse=True)
def exchanged_item_log_fixture(
    company_fixture,
    create_user_fixture,
    item_factory,
    exchange_applied_item_factory,
    exchanged_item_log_factory,
):
    user = create_user_fixture(
        email="test1@test.jp", password="test_password", company=company_fixture
    )
    item = item_factory.create(quantity=100, company=company_fixture)

    exchange_applied_item_1 = exchange_applied_item_factory.create(
        quantity=1, user=user, item=item
    )
    exchange_applied_item_2 = exchange_applied_item_factory.create(
        quantity=1, user=user, item=item
    )
    exchanged_item_log_factory.create(exchange_applied_item=exchange_applied_item_1)
    exchanged_item_log_factory.create(exchange_applied_item=exchange_applied_item_2)


@pytest.mark.django_db
def test_exchanged_item_log_count():
    count = ExchangedItemLog.objects.all().count()
    assert count == 2
