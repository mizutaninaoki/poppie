import pytest
from app.models.dealing import Dealing


@pytest.fixture(scope="function", autouse=True)
def dealing_fixture(company_fixture, create_user_fixture, dealing_factory):
    # userを作成した時にaccountも同時に作成される
    giver = create_user_fixture(
        email="giver@test.jp", password="test_password", company=company_fixture
    ).account
    giver.givable_point = 10000
    giver.save()

    receiver = create_user_fixture(
        email="receiver@test.jp", password="test_password", company=company_fixture
    ).account
    receiver.givable_point = 10000
    receiver.save()

    dealing_factory.create(
        giver=giver,
        receiver=receiver,
        company=giver.company,
        amount=2000,
        message="dealingテストメッセージ",
    )


@pytest.mark.django_db
def test_dealing_count():
    count = Dealing.objects.all().count()
    assert count == 1
