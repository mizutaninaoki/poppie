import pytest
import json
from graphene_django.utils.testing import graphql_query


@pytest.fixture
def items_query_fixture(logged_in_client_fixture, item_factory):
    user, headers = logged_in_client_fixture
    item1 = item_factory.create(company=user.company, name="テスト景品1", status=0)
    item2 = item_factory.create(company=user.company, name="テスト景品2", status=1)

    query = f"""
        query {{
            items(companyId: {user.company_id}) {{
                id
                name
                unit
                exchangablePoint
                quantity
                status
                imageKey
                imageUrl
            }}
        }}
        """

    return query, user, headers, item1, item2


@pytest.mark.django_db
def test_logged_in(items_query_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    query, *_ = items_query_fixture

    response = graphql_query(query, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_items_query(items_query_fixture):
    """会社すべての景品を取得できること"""
    query, user, headers, item1, item2 = items_query_fixture

    response = graphql_query(
        query,
        headers=headers,
    )
    content = json.loads(response.content)

    assert content == {
        "data": {
            "items": [
                {
                    "id": str(item1.id),
                    "name": item1.name,
                    "unit": item1.unit,
                    "exchangablePoint": item1.exchangable_point,
                    "quantity": item1.quantity,
                    "status": "PUBLIC",
                    "imageKey": item1.image_key,
                    "imageUrl": None,
                },
                {
                    "id": str(item2.id),
                    "name": item2.name,
                    "unit": item2.unit,
                    "exchangablePoint": item2.exchangable_point,
                    "quantity": item2.quantity,
                    "status": "PRIVATE",
                    "imageKey": item2.image_key,
                    "imageUrl": None,
                },
            ]
        }
    }
    assert "errors" not in content
