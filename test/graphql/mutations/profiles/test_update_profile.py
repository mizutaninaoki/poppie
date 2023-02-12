import pytest
import json
from graphene_django.utils.testing import graphql_query


@pytest.fixture
def update_profile_fixture(logged_in_client_fixture):
    user, headers = logged_in_client_fixture
    mutation = f"""
        mutation {{
            updateProfile(input: {{
                    userId: {user.id},
                    name: "テスト太郎",
                    department: "テスト部",
                    comment: "よろしくおねがいします",
                    imageKey: "",
                }}) {{
                profile {{
                    id
                    department
                    comment
                }}
            }}
        }}
        """

    return mutation, user, headers


@pytest.mark.django_db
def test_logged_in(update_profile_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    mutation, *_ = update_profile_fixture

    response = graphql_query(mutation, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_update_profile(update_profile_fixture):
    """profileを更新できること"""
    mutation, user, headers = update_profile_fixture

    response = graphql_query(
        mutation,
        headers=headers,
    )

    content = json.loads(response.content)

    assert content == {
        "data": {
            "updateProfile": {
                "profile": {
                    "id": str(user.profile.id),
                    "department": "テスト部",
                    "comment": "よろしくおねがいします",
                }
            }
        }
    }
    assert "errors" not in content
