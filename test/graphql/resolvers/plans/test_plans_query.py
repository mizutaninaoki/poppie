import pytest
from graphene.test import Client
from config.schema import schema
from app.models.plan import Plan

client = Client(schema)


@pytest.mark.django_db
def test_plans_query():
    """すべてのplanを取得できること"""

    plans = Plan.objects.all()

    query = """
        query {
            plans {
                id
                name
                fee
            }
        }
    """
    response = client.execute(query)
    assert response == {
        "data": {
            "plans": [
                {
                    "id": str(plans[0].id),
                    "name": str(plans[0].name),
                    "fee": plans[0].fee,
                },
                {
                    "id": str(plans[1].id),
                    "name": str(plans[1].name),
                    "fee": plans[1].fee,
                },
                {
                    "id": str(plans[2].id),
                    "name": str(plans[2].name),
                    "fee": plans[2].fee,
                },
            ]
        }
    }
    assert "errors" not in response
