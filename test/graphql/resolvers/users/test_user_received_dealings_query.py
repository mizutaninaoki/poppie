import pytest
import json
from graphene_django.utils.testing import graphql_query
import calendar
from django.utils import timezone
from django.utils.timezone import localtime


@pytest.fixture
def user_received_dealings_query_fixture(
    logged_in_client_fixture, create_user_fixture, dealing_factory
):
    receiver, headers = logged_in_client_fixture
    receiver.account.received_point = 10000
    receiver.account.save()

    giver = create_user_fixture(
        email="giver@test.jp", password="test_password", company=receiver.company
    )
    giver.account.givable_point = 10000
    giver.account.save()

    dealing = dealing_factory.create(
        giver=giver.account,
        receiver=receiver.account,
        company=giver.company,
        amount=2000,
        message="dealingテストメッセージ",
    )

    query = f"""
        query GetReceivedDealings($chartDisplayDate: String!) {{
            receivedDealings: userReceivedDealings(chartDisplayDate: $chartDisplayDate) {{
                dealings {{
                    id
                    amount
                    message
                    createdAt
                    giver {{
                        user {{
                            name
                        }}
                    }}
                }}
                createdAt
            }}
        }}
        """

    return query, headers, giver, receiver, dealing


@pytest.mark.django_db
def test_logged_in(user_received_dealings_query_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    query, *_ = user_received_dealings_query_fixture

    response = graphql_query(
        query,
        headers=None,
        operation_name="GetReceivedDealings",
        variables={"chartDisplayDate": localtime(timezone.now()).isoformat()},
    )
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_user_received_dealings_query(user_received_dealings_query_fixture):
    """もらったポイントの取引一覧を取得できること"""
    query, headers, giver, receiver, dealing = user_received_dealings_query_fixture

    response = graphql_query(
        query,
        headers=headers,
        operation_name="GetReceivedDealings",
        variables={"chartDisplayDate": localtime(timezone.now()).isoformat()},
    )
    content = json.loads(response.content)

    # インデックスのため、-1する
    assert content["data"]["receivedDealings"][localtime(timezone.now()).day - 1] == {
        "dealings": [
            {
                "id": str(dealing.id),
                "amount": dealing.amount,
                "message": dealing.message,
                "createdAt": dealing.created_at.isoformat(),
                "giver": {"user": {"name": ""}},
            }
        ],
        "createdAt": localtime(timezone.now()).isoformat(),
    }

    last_day = calendar.monthrange(
        localtime(timezone.now()).year, localtime(timezone.now()).month
    )[1]

    # テストを実行する月の日数分、receivedDealingsの配列が返ってくること
    assert len(content["data"]["receivedDealings"]) == last_day
    assert "errors" not in content
