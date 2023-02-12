import pytest
import json
from graphene_django.utils.testing import graphql_query
from app.models.dealing import Dealing
from account.models import Account


@pytest.fixture
def create_dealing_fixture(logged_in_client_fixture, create_user_fixture):
    user1, headers = logged_in_client_fixture
    user2 = create_user_fixture(
        email="user2@test.jp", password="test_password", company=user1.company
    )

    # user1がuser2に100ポイントあげるクエリ
    mutation = f"""
        mutation {{
            createDealing(input: {{
                    userId: {str(user2.id)},
                    amount: 50,
                    message: "テストメッセージ",
                }}) {{
                dealing {{
                    id
                    giver {{
                        id
                        givablePoint
                        receivedPoint
                    }}
                }}
            }}
        }}
        """

    return mutation, headers, user1, user2


@pytest.mark.django_db
def test_logged_in(create_dealing_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    mutation, *_ = create_dealing_fixture

    response = graphql_query(mutation, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_create_dealing(create_dealing_fixture):
    """ユーザーが別ユーザーにポイントをあげることができること"""
    mutation, headers, user1, user2 = create_dealing_fixture

    response = graphql_query(
        mutation,
        headers=headers,
    )

    content = json.loads(response.content)
    dealing = Dealing.objects.first()

    assert content == {
        "data": {
            "createDealing": {
                "dealing": {
                    "id": str(dealing.id),
                    "giver": {
                        "id": str(dealing.giver.id),
                        "givablePoint": dealing.giver.givable_point,
                        "receivedPoint": dealing.giver.received_point,
                    },
                }
            }
        }
    }
    assert Dealing.objects.all().count() == 1
    # あげたユーザーは50ポイント減り、もらったユーザーは50ポイント増えているはず
    assert Account.objects.get(user_id=user1.id).givable_point == -50
    assert Account.objects.get(user_id=user2.id).received_point == 50
    assert "errors" not in content
