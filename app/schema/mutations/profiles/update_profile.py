from django.db import transaction
import graphene
from account.models import Profile
from app.schema.types.profile_type import ProfileType


class UpdateProfile(graphene.relay.ClientIDMutation):
    class Input:
        user_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        department = graphene.String(required=False)
        comment = graphene.String(required=False)

    profile = graphene.Field(ProfileType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        # すでにプロフィールが存在していれば更新。なければプロフィールを作成。
        try:
            profile = Profile.objects.get(user_id=input.get("user_id"))
            profile.department = input.get("department")
            profile.comment = input.get("comment")
        except Profile.DoesNotExist:
            profile = Profile(
                user_id=input.get("user_id"),
                department=input.get("department"),
                comment=input.get("comment"),
            )

        profile.user.name = input.get("name")

        try:
            with transaction.atomic():
                profile.user.save()
                profile.save()
        except:
            print("エラーが発生しました")
            return None

        return UpdateProfile(profile=profile)


class ProfileMutation(graphene.AbstractType):
    update_profile = UpdateProfile.Field()
