from django.db import transaction
from graphql_jwt.decorators import login_required
import graphene
from account.models import User
from app.models.dealing import Dealing
from app.schema.types.dealing_type import DealingType


class CreateDealing(graphene.relay.ClientIDMutation):
    class Input:
        user_id = graphene.ID(required=True)
        amount = graphene.Int(required=True)
        message = graphene.String(required=True)

    dealing = graphene.Field(DealingType)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):

        try:
            with transaction.atomic():

                # giverの授与可能ポイントを贈与するポイント分減らす
                giver = info.context.user  # ログイン中(jwtに保存されている)のユーザー
                giver.account.givable_point -= input.get("amount")
                giver.account.save()

                # receiverの受け取った総ポイントをもらったポイント分増やす
                receiver = User.objects.get(pk=input.get("user_id"))
                receiver.account.received_point += input.get("amount")
                receiver.account.save()

                dealing = Dealing.objects.create(
                    giver=giver.account,
                    receiver=receiver.account,
                    company=giver.company,
                    amount=input.get("amount"),
                    message=input.get("message"),
                )

        except Exception as e:
            print("エラーが発生しました:", e)
            return None

        return CreateDealing(dealing=dealing)


class DealingMutation(graphene.AbstractType):
    create_dealing = CreateDealing.Field()
