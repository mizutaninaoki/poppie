import graphene
from graphene_django import DjangoObjectType
from app.models.exchanged_item import ExchangedItem
from app.schema.types.item_type import ItemType
from app.schema.types.custom_user_type import CustomUserType


class ExchangedItemType(DjangoObjectType):
    class Meta:
        model = ExchangedItem
        fields = (
            "id",
            "quantity",
            "created_at",
            "updated_at",
        )

    user = graphene.Field(graphene.NonNull(CustomUserType))
    item = graphene.Field(graphene.NonNull(ItemType))
