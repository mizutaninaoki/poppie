import pytest
import json
from graphene_django.utils.testing import graphql_query
from app.models.item import Item


@pytest.fixture
def create_item_fixture(logged_in_client_fixture):
    user, headers = logged_in_client_fixture

    mutation = f"""
        mutation {{
            createItem(input: {{
                    companyId: {str(user.company.id)},
                    name: "テスト景品",
                    unit: "個",
                    exchangablePoint: 100,
                    quantity: 10,
                    status: PUBLIC,
                    imageKey: "",
                }}) {{
                clientMutationId
            }}
        }}
        """

    return mutation, user, headers


@pytest.mark.django_db
def test_logged_in(create_item_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    mutation, *_ = create_item_fixture

    response = graphql_query(mutation, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_create_item(create_item_fixture):
    """景品を作成できること"""
    mutation, user, headers = create_item_fixture

    response = graphql_query(
        mutation,
        headers=headers,
    )

    content = json.loads(response.content)

    assert content == {"data": {"createItem": {"clientMutationId": None}}}
    assert Item.objects.all().count() == 1
    assert "errors" not in content
