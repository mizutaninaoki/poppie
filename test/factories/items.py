import factory
from app.models.item import Item


class ItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Item

    name = "テスト景品"
    unit = "個"
    exchangable_point = 100
    status = 0
    quantity = 10
    image_key = None
