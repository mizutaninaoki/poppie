from django.db import transaction
from graphql_jwt.decorators import login_required
import graphene

# from app.models.item import Item
from app.models.own_item import OwnItem
from app.models.exchanged_item_log import ExchangedItemLog
from app.schema.types.inputs.exchange_item_type import ExchangeItemType


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
                    # item_idとuser_idの組み合わせがユニークなown_itemがなければcreate、なければupdate
                    own_item = OwnItem.objects.update_or_create(
                        item_id=exchange_item.id,
                        user_id=info.context.user.id,
                        defalults={"quantity": exchange_item.exchanged_quantity},
                    )

                    item = info.context.user.items.get(pk=exchange_item.id)
                    item.update(
                        quantity=item.quantity - exchange_item.exchanged_quantity
                    )

                    ExchangedItemLog.objects.create(
                        own_item_id=own_item.id,
                        quantity=exchange_item.exchanged_quantity,
                    )
        except Exception as e:
            print("エラーが発生しました:", e)
            return None

        return CreateOrUpdateOwnItems()


class CreateOrUpdateOwnItemsMutation(graphene.AbstractType):
    create_or_update_own_items = CreateOrUpdateOwnItems.Field()
