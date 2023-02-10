import pytest

from account.models import User


@pytest.mark.django_db
def test_user_count(create_user_fixture, company_fixture):
    create_user_fixture(
        email="test1@test.jp", password="test_password", company=company_fixture
    )
    create_user_fixture(
        email="test2@test.jp", password="test_password", company=company_fixture
    )
    count = User.objects.all().count()
    assert count == 2
