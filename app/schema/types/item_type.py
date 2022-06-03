import graphene
from graphene_django import DjangoObjectType
from app.models.item import Item
from app.schema.types.company_type import CompanyType

from app.schema.enums.item_status_enum import ItemStatusEnum


class ItemType(DjangoObjectType):
    class Meta:
        model = Item
        fields = (
            "id",
            "name",
            "unit",
            "exchangable_point",
            # "image",
            "quantity",
            "created_at",
            "updated_at",
        )

    status = ItemStatusEnum(required=True)
    company = graphene.Field(graphene.NonNull(CompanyType))
