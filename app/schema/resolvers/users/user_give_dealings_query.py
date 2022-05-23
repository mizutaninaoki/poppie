import logging
import graphene
from graphql_jwt.decorators import login_required
from app.models.dealing import Dealing
from app.models.plan import Plan
from account.models import Account
from app.schema.types.dealing_type import DealingType


class UserGiveDealingsQuery(graphene.ObjectType):
    """ユーザーのポイント贈与取引一覧取得"""

    user_give_dealings = graphene.List(graphene.List(DealingType))

    @login_required
    # def resolve_user_give_dealings(root, info, account_id):
    def resolve_user_give_dealings(root, info):
        # breakpoint()
        # return Dealing.objects.select_related("giver").filter(
        # return Dealing.objects.filter(giver_id=info.context.user.account.id)

        import datetime
        from datetime import timedelta
        import calendar
        import itertools

        gave_dealings = Dealing.objects.filter(
            giver_id=info.context.user.account.id
        ).order_by("created_at")

        # breakpoint()
        today = datetime.date.today()

        # 今月の月初日を取得
        first_day = today.replace(day=1)
        # 今月の月末日を取得
        last_day = today.replace(day=calendar.monthrange(today.year, today.month)[1])
        # 日付条件の設定
        strdt = datetime.datetime.strptime(str(first_day), "%Y-%m-%d")  # 開始日
        enddt = datetime.datetime.strptime(str(last_day), "%Y-%m-%d")  # 終了日

        # 日付差の日数を算出（リストに最終日も含めたいので、＋１しています）
        days_num = (enddt - strdt).days + 1  # （参考）括弧の部分はtimedelta型のオブジェクトになります

        date_list = []
        for i in range(days_num):
            date_list.append([])

        for gave_dealing in gave_dealings:
            date_list[gave_dealing.created_at.day].append(gave_dealing)

        return date_list
