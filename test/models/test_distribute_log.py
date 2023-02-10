import pytest
from app.models.distribute_log import DistributeLog


@pytest.fixture(scope="function", autouse=True)
def distribute_log_fixture(
    company_fixture, create_user_fixture, distribute_log_factory
):
    # userを作成した時にaccountも同時に作成される
    account1 = create_user_fixture(
        email="user1@test.jp", password="test_password", company=company_fixture
    ).account

    account2 = create_user_fixture(
        email="user2@test.jp", password="test_password", company=company_fixture
    ).account

    distribute_log_factory.create(
        company=account1.company,
        account=account1,
        point=3000,
    )

    distribute_log_factory.create(
        company=account2.company,
        account=account2,
        point=6000,
    )


@pytest.mark.django_db
def test_distribute_log_count():
    count = DistributeLog.objects.all().count()
    assert count == 2


@pytest.mark.django_db
def test_distribute_log_point():
    distribute_log_1 = DistributeLog.objects.first()
    assert distribute_log_1.point == 3000

    distribute_log_2 = DistributeLog.objects.last()
    assert distribute_log_2.point == 6000
