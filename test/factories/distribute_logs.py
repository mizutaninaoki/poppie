import factory
from app.models.distribute_log import DistributeLog


class DistributeLogFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = DistributeLog

    point = 0
