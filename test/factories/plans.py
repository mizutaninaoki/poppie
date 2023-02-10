import factory
from faker import Faker

# from django.contrib.auth.models import User
from app.models.plan import Plan

fake = Faker("ja_jp")


class PlanFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Plan

    name = "free"
    fee = 0
