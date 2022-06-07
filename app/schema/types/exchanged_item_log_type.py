import graphene
from graphene_django import DjangoObjectType
from app.models.exchanged_item_log import ExchangedItemLog
from app.schema.types.exchange_applied_item_type import ExchangedItemType


class ExchangedItemLogType(DjangoObjectType):
    class Meta:
        model = ExchangedItemLog
        fields = (
            "id",
            "quantity",
            "created_at",
            "updated_at",
        )

    exchanged_item = graphene.Field(graphene.NonNull(ExchangedItemType))
