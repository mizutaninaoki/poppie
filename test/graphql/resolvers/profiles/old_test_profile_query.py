import pytest
from graphene.test import Client
from config.schema import schema
from account.models import User
from pdb import set_trace as st

from graphene_django.utils import GraphQLTestCase
from graphql_jwt.shortcuts import get_token

from graphql_jwt.testcases import JSONWebTokenTestCase, JSONWebTokenClient

# from snapshottest import TestCase

# client = Client(schema)
# client = JSONWebTokenClient(schema)

# user = None
# uuu = None


# @pytest.fixture(scope="function", autouse=True)
# def dealing_fixture(company_fixture, create_user_fixture):
#     user = create_user_fixture(
#         email="user@test.jp",
#         password="test_password",
#         company=company_fixture,
#         is_active=True,
#         is_admin=True,
#     )

# JSONWebTokenTestCase().client_class().authenticate(user)

# client.authenticate(user)

# st()

# pro = TestProfile(user)

# st()


class TestProfile(GraphQLTestCase):
    def __init__(self, user):
        pass
        # user = User.objects.first()
        # self.client = Client(schema)
        # token = get_token(user)
        # self.headers = {"HTTP_AUTHORIZATION": f"JWT {token}"}


@pytest.mark.django_db
def test_profile_query(logged_in_client_fixture):
    """profileを取得できること"""

    client, user = logged_in_client_fixture

    # client.authenticate(user)

    query = f"""
        query {{
            profile(userId: {user.id}) {{
                id
                department
                comment
                imageKey
                imageUrl
                user {{
                    id
                    name
                }}
            }}
        }}
    """
    # response = client.execute(query)

    # clienta = JSONWebTokenTestCase().client_class()
    # clienta.authenticate(user)
    # clienta.force_login
    response = client.execute(query)
    # st()
    # cli = TestProfile(user)
    # # st()
    # response = cli.query(
    #     query,
    #     headers=cli.headers,
    # )

    st()
    assert response == {
        "data": {"plan": {"id": "3", "name": "professional", "fee": 5000}}
    }
    assert "errors" not in response
