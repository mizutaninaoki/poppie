import pytest
import json
from graphene_django.utils.testing import graphql_query


@pytest.fixture
def profile_query_fixture(logged_in_client_fixture):
    user, headers = logged_in_client_fixture
    query = f"""
        query {{
            profile(userId: {user.id}) {{
                id
                department
                comment
                imageKey
                imageUrl
                user {{
                    id
                    name
                }}
            }}
        }}
        """

    return query, user, headers


@pytest.mark.django_db
def test_logged_in(profile_query_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    query, *_ = profile_query_fixture

    response = graphql_query(query, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_profile_query(profile_query_fixture):
    """profileを取得できること"""
    query, user, headers = profile_query_fixture

    response = graphql_query(
        query,
        headers=headers,
    )

    content = json.loads(response.content)

    assert content == {
        "data": {
            "profile": {
                "id": str(user.profile.id),
                "department": None,
                "comment": None,
                "imageKey": None,
                "imageUrl": None,
                "user": {"id": str(user.id), "name": ""},
            }
        }
    }
    assert "errors" not in content
