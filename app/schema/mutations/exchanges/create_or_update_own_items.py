from django.db import transaction
from graphql_jwt.decorators import login_required
import graphene
import logging

from app.models.item import Item
from app.models.own_item import OwnItem
from app.models.exchanged_item_log import ExchangedItemLog
from app.schema.types.inputs.exchange_item_type import ExchangeItemType

logger = logging.getLogger(__name__)


class CreateOrUpdateOwnItems(graphene.relay.ClientIDMutation):
    class Input:
        exchange_items = graphene.List(
            graphene.NonNull(ExchangeItemType), required=True
        )

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):

        try:
            with transaction.atomic():
                for exchange_item in input.get("exchange_items"):
                    own_item = OwnItem.objects.filter(
                        item_id=exchange_item.item_id, user_id=info.context.user.id
                    ).first()

                    if own_item:
                        own_item.quantity -= exchange_item.exchange_quantity
                    else:
                        own_item = OwnItem.objects.create(
                            item_id=exchange_item.item_id,
                            user_id=info.context.user.id,
                            quantity=exchange_item.exchange_quantity,
                        )
                    item = Item.objects.get(pk=exchange_item.item_id)
                    item.quantity -= exchange_item.exchange_quantity
                    item.save()

                    ExchangedItemLog.objects.create(
                        own_item_id=own_item.id,
                        quantity=exchange_item.exchange_quantity,
                    )
        except Exception as e:
            print("エラーが発生しました:", e)
            logger.info(f"景品交換でエラーが発生しました。 {e}")
            return None

        return CreateOrUpdateOwnItems()


class CreateOrUpdateOwnItemsMutation(graphene.AbstractType):
    create_or_update_own_items = CreateOrUpdateOwnItems.Field()
