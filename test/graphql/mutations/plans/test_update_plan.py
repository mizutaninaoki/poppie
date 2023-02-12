import pytest
import json
from graphene_django.utils.testing import graphql_query
from app.models.plan import Plan


@pytest.fixture
def update_plan_fixture():
    plan = Plan.objects.first()

    mutation = f"""
        mutation {{
            updatePlan(input: {{
                    planId: {str(plan.id)},
                }}) {{
                plan {{
                    id
                    name
                    fee
                }}
            }}
        }}
        """

    return mutation, plan


@pytest.mark.django_db
def test_profile_plan(update_plan_fixture):
    """planを更新できること"""
    mutation, plan = update_plan_fixture

    response = graphql_query(
        mutation,
        headers=None,
    )
    content = json.loads(response.content)

    assert content == {
        "data": {
            "updatePlan": {"plan": {"id": str(plan.id), "name": plan.name, "fee": 111}}
        }
    }
    assert "errors" not in content
