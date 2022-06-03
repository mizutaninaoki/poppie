import logging
import graphene
from graphql_jwt.decorators import login_required
from app.models.item import Item
from app.schema.types.item_type import ItemType

logger = logging.getLogger(__name__)


class ItemQuery(graphene.ObjectType):
    item = graphene.Field(
        ItemType,
        item_id=graphene.ID(required=True),
        required=True,
        description="景品取得",
    )

    @login_required
    def resolve_item(root, info, item_id):
        try:
            return Item.objects.get(pk=item_id)
        except Item.DoesNotExist:
            logger.exception("エラーが発生しました。景品が存在しません")
            return None
