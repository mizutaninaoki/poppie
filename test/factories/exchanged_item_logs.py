import factory
from app.models.exchanged_item_log import ExchangedItemLog


class ExchangedItemLogFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ExchangedItemLog

    quantity = 0
