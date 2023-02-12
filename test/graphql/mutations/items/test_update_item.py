import pytest
import json
from graphene_django.utils.testing import graphql_query
from app.models.item import Item


@pytest.fixture
def update_item_fixture(logged_in_client_fixture, item_factory):
    user, headers = logged_in_client_fixture
    item = item_factory.create(company=user.company, name="テスト景品", status=0)

    mutation = f"""
        mutation {{
            updateItem(input: {{
                    id: {str(item.id)},
                    name: "テスト景品更新",
                    unit: "枚",
                    exchangablePoint: 500,
                    quantity: 50,
                    status: PRIVATE,
                    imageKey: "",
                }}) {{
                clientMutationId
            }}
        }}
        """

    return mutation, user, headers, item


@pytest.mark.django_db
def test_logged_in(update_item_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    mutation, *_ = update_item_fixture

    response = graphql_query(mutation, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_update_item(update_item_fixture):
    """景品を更新できること"""
    mutation, user, headers, item = update_item_fixture

    response = graphql_query(
        mutation,
        headers=headers,
    )

    content = json.loads(response.content)

    assert content == {"data": {"updateItem": {"clientMutationId": None}}}

    updated_item = Item.objects.get(pk=item.id)
    assert updated_item.name == "テスト景品更新"
    assert updated_item.unit == "枚"
    assert updated_item.exchangable_point == 500
    assert updated_item.quantity == 50
    assert updated_item.status == 1
    assert "errors" not in content
