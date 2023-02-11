import pytest
import json
from graphene_django.utils.testing import graphql_query


@pytest.fixture
def accounts_query_fixture(logged_in_client_fixture):
    user, headers = logged_in_client_fixture
    query = f"""
        query {{
            accounts {{
                id
                givablePoint
                receivedPoint
                user {{
                    name
                    email
                    profile {{
                        id
                        department
                        comment
                        imageUrl
                    }}
                }}
            }}
        }}
        """

    return query, user, headers


@pytest.mark.django_db
def test_logged_in(accounts_query_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    query, _, _ = accounts_query_fixture

    response = graphql_query(query, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_accounts_query(accounts_query_fixture):
    """会社内すべてのaccountsを取得できること"""
    query, user, headers = accounts_query_fixture

    response = graphql_query(
        query,
        headers=headers,
    )
    content = json.loads(response.content)

    assert content == {
        "data": {
            "accounts": [
                {
                    "id": str(user.account.id),
                    "givablePoint": 0,
                    "receivedPoint": 0,
                    "user": {
                        "name": "",
                        "email": user.email,
                        "profile": {
                            "id": str(user.profile.id),
                            "department": None,
                            "comment": None,
                            "imageUrl": None,
                        },
                    },
                }
            ]
        }
    }
    assert "errors" not in content
