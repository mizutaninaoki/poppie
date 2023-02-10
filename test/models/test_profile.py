import pytest

from account.models import Profile


@pytest.fixture(scope="function", autouse=True)
def profile_fixture(company_fixture, create_user_fixture):
    # userを作成した時にprofileも同時に作成される
    create_user_fixture(
        email="test1@test.jp", password="test_password", company=company_fixture
    )


@pytest.mark.django_db
def test_image_url_image_key_none():
    """image_keyが存在しない場合、Noneを返すこと"""
    profile = Profile.objects.first()

    assert profile.image_url() == None


@pytest.mark.django_db
def test_image_url_image_key_exist(mocker):
    """image_keyが存在する場合、image_urlを返すこと"""

    profile = Profile.objects.first()
    profile.image_key = "test_key"

    # generate_image_presigned_urlメソッドをモック化
    mocker.patch(
        "app.services.amazon_s3_service.AmazonS3Service.generate_image_presigned_url",
        return_value="mocked_s3_bucket_url@test.jp",
    )
    assert profile.image_url() == "mocked_s3_bucket_url@test.jp"
