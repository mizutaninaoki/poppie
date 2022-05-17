from graphene_django import DjangoObjectType
from app.models.dealing import Dealing


class DealingType(DjangoObjectType):
    class Meta:
        model = Dealing
        fields = (
            "id",
            "company",
            "giver",
            "receiver",
            "amount",
            "message",
            "created_at",
            "updated_at",
        )
