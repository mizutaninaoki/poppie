import logging
import graphene
from graphql_jwt.decorators import login_required
from account.models import Profile
from app.schema.types.profile_type import ProfileType

from app.services.amazon_s3_service import AmazonS3Service

logger = logging.getLogger(__name__)


class ProfileQuery(graphene.ObjectType):
    profile = graphene.Field(
        graphene.NonNull(ProfileType),
        user_id=graphene.ID(required=False),
        description="プロフィール取得",
    )

    @login_required
    def resolve_profile(root, info, user_id):
        try:
            return Profile.objects.get(user_id=user_id)
        except Profile.DoesNotExist:
            logger.info("プロフィール取得でエラーが発生しました。")
            return None
