import pytest
from app.models.account import Account


@pytest.fixture(scope="function", autouse=True)
def account_fixture(company_fixture, create_user_fixture):
    # userを作成した時にaccountも同時に作成される
    user = create_user_fixture(
        email="test1@test.jp", password="test_password", company=company_fixture
    )
    user.account.givable_point = 10000
    user.account.received_point = 20000
    user.account.save()


@pytest.mark.django_db
@pytest.mark.parametrize("test_input, expected", [(100, 10100), (1000, 11000)])
def test_increase_givable_point(test_input, expected):
    account = Account.objects.first()
    account.increase_givable_point(test_input)
    assert account.givable_point == expected


@pytest.mark.django_db
@pytest.mark.parametrize("test_input, expected", [(100, 9900), (1000, 9000)])
def test_decrease_givable_point(test_input, expected):
    account = Account.objects.first()
    account.decrease_givable_point(test_input)
    assert account.givable_point == expected


@pytest.mark.django_db
@pytest.mark.parametrize("test_input, expected", [(100, 20100), (1000, 21000)])
def test_increase_received_point(test_input, expected):
    account = Account.objects.first()
    account.increase_received_point(test_input)
    assert account.received_point == expected


@pytest.mark.django_db
@pytest.mark.parametrize("test_input, expected", [(100, 19900), (1000, 19000)])
def test_decrease_received_point(test_input, expected):
    account = Account.objects.first()
    account.decrease_received_point(test_input)
    assert account.received_point == expected
