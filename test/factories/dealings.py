import factory
from app.models.dealing import Dealing


class DealingFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Dealing

    amount = 0
    message = "テストメッセージ"
