import factory

from app.models.company import Company
from .plans import PlanFactory


class CompanyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Company

    plan = factory.SubFactory(PlanFactory)
    name = "テスト株式会社"
    email = "test@test.jp"
    tel = "0312345678"
    point = 0
