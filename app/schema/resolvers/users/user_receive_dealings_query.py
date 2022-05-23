import logging
import graphene
from graphql_jwt.decorators import login_required
from app.models.dealing import Dealing
from app.schema.types.dealing_type import DealingType


class UserReceiveDealingsQuery(graphene.ObjectType):
    user_receive_dealings = graphene.List(
        DealingType,
        # account_id=graphene.ID(required=True), # 引数
        required=True,
        description="ユーザーのポイント受領取引一覧取得",
    )

    @login_required
    # def resolve_user_receive_dealings(root, info, user_id):
    def resolve_user_receive_dealings(root, info):
        return Dealing.objects.filter(receiver_id=info.context.user.account.id)

        # import datetime
        # from datetime import timedelta
        # import calendar

        # received_dealings = Dealing.objects.filter(
        #     receiver_id=info.context.user.account.id
        # ).order_by("created_at")

        # # breakpoint()
        # today = datetime.date.today()

        # # 今月の月初日を取得
        # first_day = today.replace(day=1)
        # # 今月の月末日を取得
        # last_day = today.replace(day=calendar.monthrange(today.year, today.month)[1])
        # # 日付条件の設定
        # strdt = datetime.datetime.strptime(str(first_day), "%Y-%m-%d")  # 開始日
        # enddt = datetime.datetime.strptime(str(last_day), "%Y-%m-%d")  # 終了日

        # # 日付差の日数を算出（リストに最終日も含めたいので、＋１しています）
        # days_num = (enddt - strdt).days + 1  # （参考）括弧の部分はtimedelta型のオブジェクトになります

        # datelist = []
        # for i in range(days_num):
        #     datelist.append([])

        # breakpoint()
        # for dealing in range(received_dealings):
        #     breakpoint()
        #     # dealing
        #     # datelist.append([])

        # datelist = []
        # for i in range(days_num):
        #     datelist.append(strdt + timedelta(days=i))

        # breakpoint()

        # return datelist
