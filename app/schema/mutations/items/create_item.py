from django.db import transaction
from graphql_jwt.decorators import login_required
import graphene
from app.models.item import Item
from app.schema.enums.item_status_enum import ItemStatusEnum


class CreateItem(graphene.relay.ClientIDMutation):
    class Input:
        company_id = graphene.ID(required=True)
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
                # see: https://stackoverflow.com/questions/41744096/efficient-way-to-update-multiple-fields-of-django-model-object
                Item.objects.create(**input)
        except Exception as e:
            print("エラーが発生しました:", e)
            return None

        return CreateItem()


class CreateItemMutation(graphene.AbstractType):
    create_item = CreateItem.Field()
