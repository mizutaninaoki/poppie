import logging
import graphene
from graphql_jwt.decorators import login_required
from app.models.dealing import Dealing
from app.models.plan import Plan
from account.models import Account
from app.schema.types.user_gave_dealings_type import UserGaveDealingsType

import datetime
import calendar


class UserGaveDealingsQuery(graphene.ObjectType):
    """ユーザーのポイント贈与取引一覧取得"""

    user_gave_dealings = graphene.List(
        graphene.NonNull(UserGaveDealingsType), required=True
    )

    @login_required
    def resolve_user_gave_dealings(root, info):
        gave_dealings = Dealing.objects.filter(
            giver_id=info.context.user.account.id
        ).order_by("created_at")

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
            date_list.append(
                {
                    "dealings": [],
                    "created_at": today.replace(day=i + 1).isoformat(),
                }
            )

        for gave_dealing in gave_dealings:
            date_list[gave_dealing.created_at.day]["dealings"].append(gave_dealing)

        return date_list
