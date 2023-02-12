import pytest
import json
from graphene_django.utils.testing import graphql_query
from moto import mock_s3
import environ

env = environ.Env()


@pytest.fixture
def generate_s3_presigned_url_fixture(logged_in_client_fixture):
    user, headers = logged_in_client_fixture
    mutation = f"""
        mutation {{
            generateS3PresignedUrl(input: {{
                    imageKey: "dummy_key",
                }}) {{
                    presignedUrl
            }}
        }}
        """

    return mutation, user, headers


@pytest.mark.django_db
@mock_s3
def test_logged_in(generate_s3_presigned_url_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    mutation, *_ = generate_s3_presigned_url_fixture

    response = graphql_query(mutation, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


# mock_s3のアノテーションで、test_generate_s3_presigned_url内のs3へのアクセスを自動的にモック化してくれる
@pytest.mark.django_db
def test_generate_s3_presigned_url(generate_s3_presigned_url_fixture):
    """presigned_urlを発行・取得できること"""
    mutation, user, headers = generate_s3_presigned_url_fixture

    response = graphql_query(
        mutation,
        headers=headers,
    )

    content = json.loads(response.content)

    assert (
        f"https://{env('AWS_STORAGE_BUCKET_NAME')}.s3.amazonaws.com/dummy_key"
        in content["data"]["generateS3PresignedUrl"]["presignedUrl"]
    )
    assert "errors" not in content
