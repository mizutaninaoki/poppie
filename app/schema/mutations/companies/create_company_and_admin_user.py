from django.db import transaction
import graphene
from account.models import User
from app.models.company import Company
from app.schema.types.custom_user_type import CustomUserType


class CreateCompanyAndAdminUser(graphene.relay.ClientIDMutation):
    class Input:
        plan_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        tel = graphene.String(required=True)

    admin_user = graphene.Field(CustomUserType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            with transaction.atomic():
                company = Company.objects.create(
                    plan_id=input.get("plan_id"),
                    name=input.get("name"),
                    email=input.get("email"),
                    tel=input.get("tel"),
                )

                user = User.objects.create_user(
                    email=input.get("email"),
                    password="poppie1234",  # TODO: 変える！！！！！！！！！！
                    name="管理者ユーザー",
                    is_active=True,  # TODO: 管理者もメールアドレス確認させる！！！！！！！！！！
                    is_admin=True,
                    company=company,
                )
        except Exception as e:
            print("エラーが発生しました:", e)
            return None

        return CreateCompanyAndAdminUser(admin_user=user)


class CompanyMutation(graphene.AbstractType):
    create_company_and_admin_user = CreateCompanyAndAdminUser.Field()
