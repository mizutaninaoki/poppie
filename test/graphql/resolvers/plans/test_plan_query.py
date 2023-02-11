import pytest
from graphene.test import Client
from config.schema import schema
from app.models.plan import Plan


client = Client(schema)


@pytest.mark.django_db
def test_plan_query():
    """professional planを取得できること"""
    plan = Plan.objects.last()

    query = f"""
        query {{
            plan(id: {plan.id}) {{
                id
                name
                fee
            }}
        }}
    """
    response = client.execute(query)
    assert response == {
        "data": {"plan": {"id": str(plan.id), "name": "professional", "fee": plan.fee}}
    }
    assert "errors" not in response
