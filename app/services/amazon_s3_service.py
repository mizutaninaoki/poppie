import logging
import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from graphql import GraphQLError
import environ

env = environ.Env()


class AmazonS3Service:
    # ユニークになるようにプロフィールID + ファイル名をキーに指定
    def create_presigned_url_key(self, profile_id, file_name):
        return f"{str(profile_id)}-{file_name}"

    # 署名付き画像URLを発行(PUT、アップロード用)
    def create_presigned_url(self, key, expiration=300):
        try:
            response = self.__s3_client().generate_presigned_url(
                ClientMethod="put_object",
                Params={"Bucket": env("AWS_STORAGE_BUCKET_NAME"), "Key": key},
                ExpiresIn=expiration,
                HttpMethod="PUT",
            )
        except ClientError as e:
            logging.error(e)
            raise GraphQLError(f"presigned_urlの発行でエラーが発生しました。 {e}")

        return response

    # 署名付き画像URLを発行(GET、画像表示用)
    def generate_image_presigned_url(self, key, expiration=300):
        try:
            response = self.__s3_client().generate_presigned_url(
                ClientMethod="get_object",
                Params={"Bucket": env("AWS_STORAGE_BUCKET_NAME"), "Key": key},
                ExpiresIn=expiration,
                HttpMethod="GET",
            )
        except ClientError as e:
            logging.error(e)
            raise GraphQLError(f"presigned_urlの発行でエラーが発生しました。 {e}")

        return response

    #
    # Private Methods
    #

    def __s3_client(self):
        return boto3.client(
            "s3",
            aws_access_key_id=env("AWS_S3_ACCESS_KEY_ID"),
            aws_secret_access_key=env("AWS_S3_SECRET_ACCESS_KEY"),
            region_name=env("AWS_REGION_NAME"),
            config=Config(signature_version="s3v4"),
        )
