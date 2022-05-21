from django.db import transaction
from graphql_jwt.decorators import login_required
import graphene
from account.models import Account
from app.models.distribute_log import DistributeLog
from app.schema.types.distribute_log_type import DistributeLogType
from .create_distributes_attributes import DistributeAttributes


class CreateDistributes(graphene.relay.ClientIDMutation):
    class Input:
        attributes = graphene.List(DistributeAttributes)

    distribute_log = graphene.Field(graphene.NonNull(DistributeLogType))

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            with transaction.atomic():
                for attribute in input.get("attributes"):
                    account = Account.objects.get(pk=attribute.account_id)
                    # 配布されたポイント分だけアカウントの贈与可能ポイントを増やす
                    account.givable_point += attribute.distribute_point
                    account.save()

                    # 配布されたポイント分だけ会社の持っているポイントを減らす
                    company = info.context.user.company
                    company.point -= attribute.distribute_point
                    company.save()

                    # 1アカウント(1ユーザー)毎に配布したポイントのログを残す
                    distribute_log = DistributeLog.objects.create(
                        company=company,
                        account=account,
                        point=attribute.distribute_point,
                    )

        except Exception as e:
            print("会社からアカウント（ユーザー）へのポイント配布でエラーが発生しました:", e)
            return None

        return CreateDistributes(distribute_log=distribute_log)


class DistributeMutation(graphene.AbstractType):
    create_distributes = CreateDistributes.Field()
