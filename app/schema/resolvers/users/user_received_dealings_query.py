import logging
import graphene
from graphql_jwt.decorators import login_required
from app.models.dealing import Dealing
from app.models.plan import Plan
from account.models import Account
from app.schema.types.user_received_dealings_type import UserReceivedDealingsType

import datetime
import calendar


class UserReceivedDealingsQuery(graphene.ObjectType):
    """ユーザーのポイント受領取引一覧取得"""

    user_received_dealings = graphene.List(
        graphene.NonNull(UserReceivedDealingsType),
        chart_display_date=graphene.String(required=True),
        required=True,
    )

    @login_required
    def resolve_user_received_dealings(root, info, chart_display_date):
        # フロントから送られてきた、チャートに表示させる日付をdate型に変換
        chart_date = datetime.datetime.strptime(chart_display_date, "%Y-%m-%d").date()

        # チャートで表示させる月初日を取得
        first_day = chart_date.replace(day=1)
        # チャートで表示させる月末日を取得
        last_day = chart_date.replace(
            day=calendar.monthrange(chart_date.year, chart_date.month)[1]
        )
        # 日付条件の設定
        strdt = datetime.datetime.strptime(str(first_day), "%Y-%m-%d")  # 開始日
        enddt = datetime.datetime.strptime(str(last_day), "%Y-%m-%d")  # 終了日

        # 日付差の日数を算出（リストに最終日も含めたいので、＋１しています）
        days_num = (enddt - strdt).days + 1  # （参考）括弧の部分はtimedelta型のオブジェクトになります

        # チャートで表示させる月のポイントを贈った取引(dealing)を取得
        received_dealings = Dealing.objects.filter(
            receiver_id=info.context.user.account.id, created_at__range=(strdt, enddt)
        ).order_by("created_at")

        date_list = []
        for i in range(days_num):
            date_list.append(
                {
                    "dealings": [],
                    "created_at": chart_date.replace(day=i + 1).isoformat(),
                }
            )

        for received_dealing in received_dealings:
            # 配列のインデックスに合わせるため、ポイントをもらった日から1引く
            date_list[received_dealing.created_at.day - 1]["dealings"].append(
                received_dealing
            )

        return date_list
