from graphene_django import DjangoObjectType
from account.models import Profile
import graphene


class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile
        fields = (
            "id",
            "user",
            "department",
            "comment",
            "image_key",
            "created_at",
            "updated_at",
        )

    image_url = graphene.String(required=False)

    def resolve_image_url(self, info):
        return self.image_url()
