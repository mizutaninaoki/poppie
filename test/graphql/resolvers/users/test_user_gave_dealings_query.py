import pytest
import json
from graphene_django.utils.testing import graphql_query
import calendar
import datetime


@pytest.fixture
def user_gave_dealings_query_fixture(
    logged_in_client_fixture, create_user_fixture, dealing_factory
):
    giver, headers = logged_in_client_fixture
    giver.account.givable_point = 10000
    giver.account.save()

    receiver = create_user_fixture(
        email="receiver@test.jp", password="test_password", company=giver.company
    )
    receiver.account.givable_point = 10000
    receiver.account.save()

    dealing = dealing_factory.create(
        giver=giver.account,
        receiver=receiver.account,
        company=giver.company,
        amount=2000,
        message="dealingテストメッセージ",
    )

    query = f"""
        query GetGaveDealings($chartDisplayDate: String!) {{
            gaveDealings: userGaveDealings(chartDisplayDate: $chartDisplayDate) {{
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
def test_logged_in(user_gave_dealings_query_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    query, *_ = user_gave_dealings_query_fixture

    response = graphql_query(
        query,
        headers=None,
        operation_name="GetGaveDealings",
        variables={"chartDisplayDate": datetime.datetime.now().date().isoformat()},
    )
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_user_gave_dealings_query(user_gave_dealings_query_fixture):
    """あげたポイントの取引一覧を取得できること"""
    query, headers, giver, receiver, dealing = user_gave_dealings_query_fixture

    response = graphql_query(
        query,
        headers=headers,
        operation_name="GetGaveDealings",
        variables={"chartDisplayDate": datetime.datetime.now().date().isoformat()},
    )
    content = json.loads(response.content)

    # インデックスのため、-1する
    assert content["data"]["gaveDealings"][datetime.datetime.now().day - 1] == {
        "dealings": [
            {
                "id": str(dealing.id),
                "amount": dealing.amount,
                "message": dealing.message,
                "createdAt": dealing.created_at.isoformat(),
                "giver": {"user": {"name": ""}},
            }
        ],
        "createdAt": datetime.datetime.now().date().isoformat(),
    }

    last_day = calendar.monthrange(
        datetime.datetime.now().year, datetime.datetime.now().month
    )[1]

    # テストを実行する月の日数分、gaveDealingsの配列が返ってくること
    assert len(content["data"]["gaveDealings"]) == last_day
    assert "errors" not in content
