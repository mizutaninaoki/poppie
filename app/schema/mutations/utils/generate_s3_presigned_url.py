import graphene
from graphql_jwt.decorators import login_required
from graphql import GraphQLError

import environ
import logging
import uuid

env = environ.Env()
from app.services.amazon_s3_service import AmazonS3Service

logger = logging.getLogger(__name__)


class GenerateS3PresignedUrl(graphene.relay.ClientIDMutation):
    class Input:
        image_key = graphene.String(required=True)

    presigned_url = graphene.String(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            presigned_url = AmazonS3Service().create_presigned_url(
                input.get("image_key")
            )
        except Exception as e:
            logger.info(f"presigned_urlの発行でエラーが発生しました。 {e}")
            raise GraphQLError("presigned_urlの発行でエラーが発生しました。")

        return GenerateS3PresignedUrl(presigned_url=presigned_url)


class GenerateS3PresignedUrlMutation(graphene.AbstractType):
    generate_s3_presigned_url = GenerateS3PresignedUrl.Field()
