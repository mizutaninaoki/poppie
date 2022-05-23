import graphene
from app.schema.types.dealing_type import DealingType


class UserGaveDealingsType(graphene.ObjectType):
    """ユーザーが過去にポイントを贈与した取引一覧"""

    dealings = graphene.List(graphene.NonNull(DealingType), required=True)
    created_at = graphene.String(required=True)
