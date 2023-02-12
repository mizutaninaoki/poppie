import pytest
import json
from graphene_django.utils.testing import graphql_query
from app.models.distribute_log import DistributeLog


@pytest.fixture
def create_distribute_fixture(logged_in_client_fixture, create_user_fixture):
    user1, headers = logged_in_client_fixture
    user2 = create_user_fixture(
        email="user2@test.jp", password="test_password", company=user1.company
    )

    mutation = f"""
        mutation {{
            createDistributes(input: {{
                attributes: [{{
                    accountId: {str(user1.account.id)},
                    distributePoint: 1000,
                }},
                {{
                    accountId: {str(user2.account.id)},
                    distributePoint: 2000,
                }}],
                }}) {{
                distributeLog {{
                    id
                    company {{
                        id
                        point
                    }}
                }}
            }}
        }}
        """

    return mutation, headers, user1, user2


@pytest.mark.django_db
def test_logged_in(create_distribute_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    mutation, *_ = create_distribute_fixture

    response = graphql_query(mutation, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_create_distribute(create_distribute_fixture):
    """ポイントをユーザーに配布できること"""
    mutation, headers, user1, user2 = create_distribute_fixture

    response = graphql_query(
        mutation,
        headers=headers,
    )

    content = json.loads(response.content)
    distribute_log = DistributeLog.objects.last()
    assert content == {
        "data": {
            "createDistributes": {
                "distributeLog": {
                    "id": str(distribute_log.id),
                    "company": {
                        "id": str(distribute_log.company.id),
                        "point": distribute_log.company.point,
                    },
                }
            }
        }
    }
    assert DistributeLog.objects.all().count() == 2
    assert "errors" not in content
