from django.db import transaction
from graphql_jwt.decorators import login_required
import graphene
from app.models.item import Item
from app.schema.enums.item_status_enum import ItemStatusEnum


class UpdateItem(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        name = graphene.String(required=True)
        unit = graphene.String(required=True)
        # image = graphene.String(required=True)
        exchangable_point = graphene.Int(required=True)
        status = ItemStatusEnum(required=True)
        quantity = graphene.Int(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):

        try:
            with transaction.atomic():
                Item.objects.filter(pk=input.get("id")).update(**input)
        except Exception as e:
            print("景品更新でエラーが発生しました:", e)
            # raise GraphQLError("Value is too long")
            return None

        return UpdateItem()


class UpdateItemMutation(graphene.AbstractType):
    update_item = UpdateItem.Field()
