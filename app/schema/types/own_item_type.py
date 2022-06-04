import graphene
from graphene_django import DjangoObjectType
from app.models.own_item import OwnItem
from app.schema.types.item_type import ItemType
from app.schema.types.custom_user_type import CustomUserType


class OwnItemType(DjangoObjectType):
    class Meta:
        model = OwnItem
        fields = (
            "id",
            "quantity",
            "created_at",
            "updated_at",
        )

    user = graphene.Field(graphene.NonNull(CustomUserType))
    item = graphene.Field(graphene.NonNull(ItemType))
