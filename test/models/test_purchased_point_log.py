import pytest
from app.models.purchased_point_log import PurchasedPointLog


@pytest.fixture(scope="function", autouse=True)
def purchased_point_log_fixture(company_fixture, purchased_point_log_factory):
    purchased_point_log_factory.create(
        company=company_fixture,
        point=10000,
        price=10000,
    )
    purchased_point_log_factory.create(
        company=company_fixture,
        point=20000,
        price=20000,
    )


@pytest.mark.django_db
def test_exchanged_item_log_count():
    count = PurchasedPointLog.objects.all().count()
    assert count == 2
