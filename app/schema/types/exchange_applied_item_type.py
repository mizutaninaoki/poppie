import graphene
from graphene_django import DjangoObjectType
from app.models.exchange_applied_item import ExchangeAppliedItem
from app.schema.types.item_type import ItemType
from app.schema.types.custom_user_type import CustomUserType


class ExchangeAppliedItemsType(DjangoObjectType):
    class Meta:
        model = ExchangeAppliedItem
        fields = (
            "id",
            "quantity",
            "created_at",
            "updated_at",
        )

    user = graphene.Field(graphene.NonNull(CustomUserType))
    item = graphene.Field(graphene.NonNull(ItemType))
