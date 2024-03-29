from django.db import transaction
from graphql_jwt.decorators import login_required
import graphene
from graphql import GraphQLError
from app.models.item import Item
from app.schema.enums.item_status_enum import ItemStatusEnum


class UpdateItem(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        name = graphene.String(required=True)
        unit = graphene.String(required=True)
        exchangable_point = graphene.Int(required=True)
        status = ItemStatusEnum(required=True)
        quantity = graphene.Int(required=True)
        image_key = graphene.String(required=False)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            with transaction.atomic():
                Item.objects.filter(pk=input.get("id")).update(**input)
        except Exception as e:
            print("景品更新でエラーが発生しました:", e)
            raise GraphQLError("景品更新でエラーが発生しました")
            return None

        return UpdateItem()


class UpdateItemMutation(graphene.ObjectType):
    update_item = UpdateItem.Field()
