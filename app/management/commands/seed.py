# see: https://stackoverflow.com/questions/51577441/how-to-seed-django-project-insert-a-bunch-of-data-into-the-project-for-initi

# <project>/<app>/management/commands/seed.py
from django.core.management.base import BaseCommand
import random

from account.models import User

from app.models.plan import Plan
from app.models.company import Company
from app.models.account import Account
from app.models.dealing import Dealing
from app.models.distribute_log import DistributeLog
from app.models.purchased_point_log import PurchasedPointLog


import datetime
import logging

logger = logging.getLogger(__name__)

# python manage.py seed --mode=refresh

""" Clear all data and creates addresses """
MODE_REFRESH = "refresh"

""" Clear all data and do not create any object """
MODE_CLEAR = "clear"


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("seeding data...")
        run_seed(self, options["mode"])
        self.stdout.write("done.")


# def clear_data():
#     """Deletes all the table data"""
#     logger.info("Delete Address instances")
#     Address.objects.all().delete()


def create_master_data():
    plans = [
        {"name": "free", "fee": 0},
        {"name": "standard", "fee": 2000},
        {"name": "professional", "fee": 5000},
    ]
    for plan in plans:
        Plan.objects.create(
            name=plan["name"],
            fee=plan["fee"],
        )


def create_seed_data():
    """Creates an address object combining different elements from the list"""
    logger.info("Creating seed data...")

    company_admin_user_email = "test@test.com"
    test_password = "test1234"  # TODO: 変える！

    #
    # Company作成
    #
    company = Company.objects.create(
        plan_id=Plan.objects.get(name="free").id,
        name="テスト株式会社",
        email=company_admin_user_email,
        tel="09012345678",
        point=0,
    )

    #
    # User(Account, Profile)作成(管理者ユーザー)
    #
    company_admin_user = User.objects.create_user(
        company_id=company.id,
        name="管理者ユーザー",
        email=company_admin_user_email,
        password=test_password,
        is_active=True,
        is_admin=True,
    )

    #
    # User(Account, Profile)作成(一般ユーザー)
    #
    for i in range(3):
        User.objects.create_user(
            company_id=company.id,
            name=f"テストユーザー{i}",
            email=f"user{i}@user.com",
            password=test_password,
            is_active=True,
            is_admin=False,
        )

    #
    # 会社によるポイント購入(31日前に購入した想定)
    #
    purchase_point = 20000
    purchase_price = 20000

    company.point += purchase_point
    company.save()
    PurchasedPointLog.objects.create(
        company=company,
        point=purchase_point,
        price=purchase_point,
        created_at=datetime.datetime.now() - datetime.timedelta(days=31),
        updated_at=datetime.datetime.now() - datetime.timedelta(days=31),
    )

    #
    # 会社からユーザーたちへポイント配布(31日前に配布した想定)
    #
    accounts = Account.objects.all()
    distribute_point = 3000  # (管理者ユーザー + 一般ユーザー3人 -> 12,000ポイント配布)

    for account in accounts:
        account.increase_givable_point(distribute_point)
        account.company.decrease_point(distribute_point)

        DistributeLog.objects.create(
            company=company,
            account=account,
            point=distribute_point,
            created_at=datetime.datetime.now() - datetime.timedelta(days=31),
            updated_at=datetime.datetime.now() - datetime.timedelta(days=31),
        )

    #
    # ユーザー１によるポイント贈与(30日前から１日１回ポイントの取引があったことを想定)
    #

    for i in range(30):
        ##=====================================
        # ユーザー1 -> ユーザー2へポイント贈与
        ##=====================================
        give_point = random.randint(1, 100)

        give_user = User.objects.get(pk=1)
        give_user.account.decrease_givable_point(give_point)

        receive_user = User.objects.get(pk=2)
        receive_user.account.increase_received_point(give_point)

        dealing = Dealing.objects.create(
            giver=give_user.account,
            receiver=receive_user.account,
            company=give_user.company,
            amount=give_point,
            message="いつもありがとう！",
        )

        # update_fieldsを使用して、auto_nowをオーバーライドして、強制的に指定した時間で保存するようにしています。
        dealing.created_at = datetime.datetime.now() - datetime.timedelta(
            days=(30 + 1) - i
        )
        dealing.updated_at = datetime.datetime.now() - datetime.timedelta(
            days=(30 + 1) - i
        )
        dealing.save(update_fields=["created_at", "updated_at"])

        # =====================================
        # ユーザー2 -> ユーザー1へポイント贈与
        ##=====================================
        give_point = random.randint(1, 100)

        give_user = User.objects.get(pk=2)
        give_user.account.decrease_givable_point(give_point)

        receive_user = User.objects.get(pk=1)
        receive_user.account.increase_received_point(give_point)

        dealing = Dealing.objects.create(
            giver=give_user.account,
            receiver=receive_user.account,
            company=give_user.company,
            amount=give_point,
            message="こちらこそいつもありがとう！",
        )

        dealing.created_at = datetime.datetime.now() - datetime.timedelta(
            days=(30 + 1) - i
        )
        dealing.updated_at = datetime.datetime.now() - datetime.timedelta(
            days=(30 + 1) - i
        )
        dealing.save(update_fields=["created_at", "updated_at"])


def run_seed(self, mode):
    """Seed database based on mode

    :param mode: refresh / clear
    :return:
    """
    # Clear data from tables
    # clear_data()
    # if mode == MODE_CLEAR:
    #     return

    create_master_data()
    create_seed_data()
