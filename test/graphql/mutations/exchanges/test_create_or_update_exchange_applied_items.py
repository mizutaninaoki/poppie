import pytest
import json
from graphene_django.utils.testing import graphql_query
from app.models.exchange_applied_item import ExchangeAppliedItem
from app.models.exchanged_item_log import ExchangedItemLog
from app.models.item import Item
from account.models import User


@pytest.fixture
def create_or_update_exchange_applied_items_fixture(
    logged_in_client_fixture, item_factory
):
    user, headers = logged_in_client_fixture
    item1 = item_factory.create(
        company=user.company, name="テスト景品1", status=0, quantity=100
    )
    item2 = item_factory.create(
        company=user.company, name="テスト景品2", status=0, quantity=100
    )

    # NOTE: なぜかitemIdとuserIdにstr()を使用しても、文字列に変換されず、エラーになってしまう。
    mutation = f"""
        mutation {{
            createOrUpdateExchangeAppliedItems(input: {{
                exchangeItems: [{{
                    itemId: "{item1.id}",
                    userId: "{user.id}",
                    exchangeQuantity: 1,
                }},
                {{
                    itemId: "{item2.id}",
                    userId: "{user.id}",
                    exchangeQuantity: 2,
                }}],
                }}) {{
                account {{
                    id
                    receivedPoint
                }}
            }}
        }}
        """

    return mutation, headers, user, item1, item2


@pytest.mark.django_db
def test_logged_in(create_or_update_exchange_applied_items_fixture):
    """認証トークンがない場合、エラーが発生すること"""
    mutation, *_ = create_or_update_exchange_applied_items_fixture

    response = graphql_query(mutation, headers=None)
    content = json.loads(response.content)
    assert "errors" in content


@pytest.mark.django_db
def test_create_or_update_exchange_applied_items_fixture(
    create_or_update_exchange_applied_items_fixture,
):
    """ユーザーがポイントを景品に交換できること"""
    (
        mutation,
        headers,
        user,
        item1,
        item2,
    ) = create_or_update_exchange_applied_items_fixture

    response = graphql_query(
        mutation,
        headers=headers,
    )

    content = json.loads(response.content)
    # DBからuserを取得する(factoryのuserにはreceived_pointの記録が更新されていないため)
    exchangedUser = User.objects.get(pk=user.id)
    assert content == {
        "data": {
            "createOrUpdateExchangeAppliedItems": {
                "account": {
                    "id": str(exchangedUser.account.id),
                    "receivedPoint": exchangedUser.account.received_point,
                }
            }
        }
    }
    assert ExchangeAppliedItem.objects.all().count() == 2
    assert ExchangedItemLog.objects.all().count() == 2
    assert Item.objects.get(pk=item1.id).quantity == 99
    assert Item.objects.get(pk=item2.id).quantity == 98
    assert "errors" not in content
