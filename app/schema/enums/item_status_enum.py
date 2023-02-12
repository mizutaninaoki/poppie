import graphene
from app.models.item import Item

# class ItemStatusEnum(graphene.Enum):
#     PUBLIC = 0
#     PRIVATE = 1

# pythonのenumをgrapheneで使えるように変換している
ItemStatusEnum = graphene.Enum.from_enum(Item.Statuses)
