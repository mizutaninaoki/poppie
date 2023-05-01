import graphene
from graphql_jwt.decorators import login_required
from app.models.dealing import Dealing
from app.schema.types.user_gave_dealings_type import UserGaveDealingsType

import calendar
import datetime


class UserGaveDealingsQuery(graphene.ObjectType):
    """ユーザーのポイント贈与取引一覧取得"""

    user_gave_dealings = graphene.List(
        graphene.NonNull(UserGaveDealingsType),
        chart_display_date=graphene.String(required=True),
        required=True,
    )

    @login_required
    def resolve_user_gave_dealings(root, info, chart_display_date):
        # フロントから送られてきた、チャートに表示させる日付をdate型に変換
        chart_date = (
            datetime.datetime.now().strptime(chart_display_date, "%Y-%m-%d").date()
        )

        # チャートで表示させる月初日を取得
        first_day = chart_date.replace(day=1).day
        # チャートで表示させる月末日を取得
        last_day = chart_date.replace(
            day=calendar.monthrange(chart_date.year, chart_date.month)[1]
        ).day

        # 日付条件の設定
        # 開始日
        strdt = datetime.datetime.now().replace(
            year=chart_date.year,
            month=chart_date.month,
            day=first_day,
            hour=0,
            minute=0,
            second=0,
        )

        # 終了日
        enddt = datetime.datetime.now().replace(
            year=chart_date.year,
            month=chart_date.month,
            day=last_day,
            hour=23,
            minute=59,
            second=59,
        )

        # 月の日数を取得
        days_num = enddt.day

        # チャートで表示させる月のポイントを贈った取引(dealing)を取得
        # FIXME: N+1, Django ORMで取得時、UTC基準の月初 〜 月末で取得してしまう。timedeltaで9時間プラスしているのを修正したい
        gave_dealings = (
            Dealing.objects.select_related("giver__user")
            .filter(
                giver_id=info.context.user.account.id,
                created_at__range=(strdt, enddt),
            )
            .order_by("created_at")
        )

        date_list = []
        # 1月だったら、days_numに31が入っている。rangeで0~30の31回ループが回る
        for i in range(days_num):
            date_list.append(
                {
                    "dealings": [],
                    "created_at": chart_date.replace(day=i + 1).isoformat(),
                }
            )

        for gave_dealing in gave_dealings:
            # 配列のインデックスに合わせるため、ポイントをもらった日から1引く
            date_list[gave_dealing.created_at.day - 1]["dealings"].append(gave_dealing)
        return date_list
