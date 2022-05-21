from graphene_django import DjangoObjectType
from app.models.company import Company


class CompanyType(DjangoObjectType):
    class Meta:
        model = Company
        fields = (
            "id",
            "plan",
            "name",
            "email",
            "tel",
            "point",
            "created_at",
            "updated_at",
        )
