import pytest
import json
from graphene_django.utils.testing import graphql_query
from app.models.plan import Plan
from app.models.company import Company
from account.models import User


@pytest.fixture
def create_company_and_admin_user_fixture():
    plan = Plan.objects.first()
    mutation = f"""
        mutation {{
            createCompanyAndAdminUser(input: {{
                    planId: {str(plan.id)},
                    name: "テスト株式会社",
                    email: "test@test.test",
                    tel: "09055554444",
                }}) {{
                adminUser {{
                    email
                    password
                }}
            }}
        }}
        """

    return mutation


@pytest.mark.django_db
def test_create_create_create_company_and_admin_user(
    create_company_and_admin_user_fixture,
):
    """新規登録ができること"""
    mutation = create_company_and_admin_user_fixture

    response = graphql_query(
        mutation,
        headers=None,
    )

    content = json.loads(response.content)
    user = User.objects.first()
    company = Company.objects.first()

    # FIXME: パスワードを返す仕様はよくない。パスワードを返さないように、mutation自体の仕様を変更する！
    assert content == {
        "data": {
            "createCompanyAndAdminUser": {
                "adminUser": {
                    "email": user.email,
                    "password": user.password,
                }
            }
        }
    }
    assert User.objects.all().count() == 1
    assert Company.objects.all().count() == 1
    assert company.name == "テスト株式会社"
    assert company.email == "test@test.test"
    assert company.tel == "09055554444"
    assert user.name == "管理者ユーザー"
    assert user.email == "test@test.test"
    assert "errors" not in content
