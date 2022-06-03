import logging
import graphene
from graphql_jwt.decorators import login_required
from app.models.item import Item
from app.schema.types.item_type import ItemType


class ItemsQuery(graphene.ObjectType):
    items = graphene.List(
        graphene.NonNull(ItemType),
        company_id=graphene.ID(required=True),
        required=True,
        description="景品一覧取得",
    )

    @login_required
    def resolve_items(root, info, company_id):
        return Item.objects.filter(company_id=company_id)
