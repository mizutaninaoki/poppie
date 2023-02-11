from django.db import transaction
from graphql_jwt.decorators import login_required
import graphene
from account.models import User
from app.models.company import Company
from app.models.purchased_point_log import PurchasedPointLog
from app.schema.types.purchased_point_log_type import PurchasedPointLogType


class CreatePurchasePoint(graphene.relay.ClientIDMutation):
    class Input:
        company_id = graphene.ID(required=True)
        point = graphene.Int(required=True)
        price = graphene.Int(required=True)

    purchased_point_log = graphene.Field(graphene.NonNull(PurchasedPointLogType))

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        company = Company.objects.get(pk=input.get("company_id"))
        # 購入したポイントを足す
        company.point += input.get("point")

        try:
            with transaction.atomic():
                company.save()
                purchased_point_log = PurchasedPointLog.objects.create(
                    company=company,
                    point=input.get("point"),
                    price=input.get("price"),
                )
                # TODO: ここでstripeで実際の決済処理を入れる！

        except Exception as e:
            print("ポイント購入でエラーが発生しました:", e)
            return None

        return CreatePurchasePoint(purchased_point_log=purchased_point_log)


class PurchaseMutation(graphene.ObjectType):
    create_purchase_point = CreatePurchasePoint.Field()
