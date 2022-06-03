import graphene


class ItemStatusEnum(graphene.Enum):
    PUBLIC = 0
    PRIVATE = 1


# ItemStatus = graphene.Enum.from_enum(ItemStatusEnum)
# みたいな書き方はpythonのenumをgrapheneのenumに変換する時に使用する
