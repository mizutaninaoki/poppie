import factory
from app.models.purchased_point_log import PurchasedPointLog


class PurchasedPointLogFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PurchasedPointLog

    point = 0
    price = 0
