import pytest
import json
from graphene_django.utils.testing import graphql_query
from app.models.purchased_point_log import PurchasedPointLog


@pytest.fixture
def create_purchase_fixture(logged_in_client_fixture):
    user, headers = logged_in_client_fixture

    mutation = f"""
        mutation {{
            createPurchasePoint(input: {{
                    companyId: {str(user.company.id)},
                    point: 3000,
                    price: 3000,
                }}) {{
                purchasedPointLog {{
                    id
                    company {{
                        id
                        point
                    }}
                }}
            }}
        }}
        """

    return mutation, headers, user


@pytest.mark.django_db
def test_logged_in(create_purchase_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    mutation, *_ = create_purchase_fixture

    response = graphql_query(mutation, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_create_purchase(create_purchase_fixture):
    """会社がポイントを購入に配布できること"""
    mutation, headers, user = create_purchase_fixture

    response = graphql_query(
        mutation,
        headers=headers,
    )

    content = json.loads(response.content)
    distribute_log = PurchasedPointLog.objects.first()

    assert content == {
        "data": {
            "createPurchasePoint": {
                "purchasedPointLog": {
                    "id": str(distribute_log.id),
                    "company": {
                        "id": str(distribute_log.company.id),
                        "point": distribute_log.company.point,
                    },
                }
            }
        }
    }
    assert PurchasedPointLog.objects.all().count() == 1
    assert "errors" not in content
