from django.db import transaction
import graphene
from account.models import Profile
from app.schema.types.profile_type import ProfileType
from graphql import GraphQLError
import logging

logger = logging.getLogger(__name__)


class UpdateProfile(graphene.relay.ClientIDMutation):
    class Input:
        user_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        department = graphene.String(required=False)
        comment = graphene.String(required=False)
        image_key = graphene.String(required=False)

    profile = graphene.Field(ProfileType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        profile = Profile.objects.get(user_id=input.get("user_id"))
        profile.department = input.get("department")
        profile.comment = input.get("comment")
        profile.image_key = input.get("image_key") or profile.image_key

        profile.user.name = input.get("name")

        try:
            with transaction.atomic():
                profile.save()
                profile.user.save()
        except Exception as e:
            logger.info(f"プロフィール登録でエラーが発生しました。 {e}")
            raise GraphQLError(f"プロフィール登録でエラーが発生しました。{e}")

        return UpdateProfile(profile=profile)


class ProfileMutation(graphene.AbstractType):
    update_profile = UpdateProfile.Field()
