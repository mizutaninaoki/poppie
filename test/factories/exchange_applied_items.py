import factory
from app.models.exchange_applied_item import ExchangeAppliedItem


class ExchangeAppliedItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ExchangeAppliedItem

    quantity = 0
