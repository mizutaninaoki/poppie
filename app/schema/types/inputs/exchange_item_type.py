import graphene


# 引数(input。class Input)の型はgraphene.InputObjectTypeを継承させる。class Metaは必要なし。
class ExchangeItemType(graphene.InputObjectType):
    item_id = graphene.String(required=True)
    user_id = graphene.String(required=True)
    exchange_quantity = graphene.Int(required=True)
