import pytest
from app.services.amazon_s3_service import AmazonS3Service
from moto import mock_s3
import environ

env = environ.Env()


@pytest.mark.django_db
def test_create_presigned_url_key():
    """presigned_url + keyの文字列を返すこと"""
    client = AmazonS3Service()

    profile_id = "profile/100"
    file_name = "test.jpeg"
    assert (
        client.create_presigned_url_key(profile_id, file_name)
        == "profile/100-test.jpeg"
    )


# mock_s3のアノテーションで、test_create_presigned_url内のs3へのアクセスを自動的にモック化してくれる
@pytest.mark.django_db
@mock_s3
def test_create_presigned_url():
    """署名付き画像URL(PUT、アップロード用)が発行されること"""
    presigned_url = AmazonS3Service().create_presigned_url("post_dummy_image_key")
    assert (
        f"https://{env('AWS_STORAGE_BUCKET_NAME')}.s3.amazonaws.com/post_dummy_image_key"
        in presigned_url
    )


@pytest.mark.django_db
@mock_s3
def test_generate_image_presigned_url():
    """署名付き画像URL(GET、画像表示用)を発行されること"""
    presigned_url = AmazonS3Service().generate_image_presigned_url(
        "get_dummy_image_key"
    )
    assert (
        f"https://{env('AWS_STORAGE_BUCKET_NAME')}.s3.amazonaws.com/get_dummy_image_key"
        in presigned_url
    )
