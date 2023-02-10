import pytest
from app.models.plan import Plan


@pytest.mark.django_db
def test_plan_count(plan_factory):
    plan_count = Plan.objects.all().count()
    assert plan_count == 3
