import graphene
from graphene_django import DjangoObjectType
import graphql_jwt
from django.contrib.auth import get_user_model
from graphql_auth import mutations, relay
from .models import User

from app.schema.types.custom_user_type import CustomUserType


# graphql_auth.relayではなく、graphene.relayを使う
class CreateUser(graphene.relay.ClientIDMutation):
    class Input:
        company_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        password1 = graphene.String(required=True)
        password2 = graphene.String(required=True)

    # user = graphene.Field(graphene.NonNull(CustomUserType))
    user = graphene.Field(CustomUserType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = User.objects.create_user(
            company_id=input.get("company_id"),
            name=input.get("name"),
            email=input.get("email"),
            password="poppie1234",  # TODO: デフォルトはpoppie1234でOKかどうか検討
            is_active=False,
            is_admin=False,
        )

        return CreateUser(user=user)


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()


# --------------------------
# Resolver
# --------------------------
class CompanyUsersQuery(graphene.ObjectType):
    company_users = graphene.List(
        graphene.NonNull(CustomUserType),
        required=True,
        company_id=graphene.ID(required=True),
    )

    def resolve_company_users(root, info, company_id):
        return User.objects.select_related("account", "company").filter(
            company_id=company_id
        )


class ObtainJSONWebToken(graphql_jwt.relay.JSONWebTokenMutation):
    user = graphene.Field(CustomUserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class AuthMutation(graphene.ObjectType):
    # 新規登録
    # register = relay.Register.Field()
    custom_register = CreateUser.Field()
    # アカウント(ユーザー)の有効化。graphql_auth_userstatus#verifiedが1を更新。
    verify_account = relay.VerifyAccount.Field()

    resend_activation_email = mutations.ResendActivationEmail.Field()
    send_password_reset_email = mutations.SendPasswordResetEmail.Field()
    password_reset = mutations.PasswordReset.Field()
    # password_set = mutations.PasswordSet.Field()  # For passwordless registration
    password_change = mutations.PasswordChange.Field()
    update_account = mutations.UpdateAccount.Field()
    archive_account = mutations.ArchiveAccount.Field()
    delete_account = mutations.DeleteAccount.Field()
    send_secondary_email_activation = mutations.SendSecondaryEmailActivation.Field()
    verify_secondary_email = mutations.VerifySecondaryEmail.Field()
    swap_emails = mutations.SwapEmails.Field()
    remove_secondary_email = mutations.RemoveSecondaryEmail.Field()

    # 以下はdjango-graphql-jwtの元々のエンドポイント
    token_auth = ObtainJSONWebToken.Field()  # ログイン(トークン生成)
    verify_token = graphql_jwt.relay.Verify.Field()  # トークン認証
    refresh_token = graphql_jwt.relay.Refresh.Field()  # トークンリフレッシュ
    revoke_token = mutations.RevokeToken.Field()  # リフレッシュトークンの無効化
    # delete_token_cookie = graphql_jwt.relay.DeleteJSONWebTokenCookie.Field()

    # リフレッシュトークンを一度使用したら削除する設定を追加
    # @receiver(refresh_token_rotated)
    # def revoke_refresh_token(sender, request, refresh_token, **kwargs):
    #     refresh_token.revoke(request)
