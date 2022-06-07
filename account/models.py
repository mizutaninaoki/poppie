from django.db import models, transaction
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import UserManager, PermissionsMixin

import sys

sys.path.append("../")  # 上の階層からモジュールを呼び出す時必要
from app.models.company import Company
from app.models.account import Account

from app.services.amazon_s3_service import AmazonS3Service
import environ

env = environ.Env()


class CustomUserManager(UserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("メールアドレスは必須です")

        email = self.normalize_email(email)
        email = email.lower()
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_superuser = False
        user.is_staff = False

        # ユーザーの新規作成のタイミングで、AccountとProfileレコードも空の状態で作成
        with transaction.atomic():
            user.save()
            Account.objects.create(
                user=user,
                company=user.company,
            )
            Profile.objects.create(user=user)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


# AbstractBaseUserクラスを継承し、新たにUserクラスを作成します。
# フィールドにユーザー情報として必要な情報を追加。
class User(AbstractBaseUser, PermissionsMixin):
    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.PROTECT)
    email = models.EmailField("メールアドレス", max_length=255, unique=True)
    name = models.CharField("名前", max_length=30)
    username = None
    first_name = None
    last_name = None
    is_active = models.BooleanField(
        null=False, default=False
    )  # djangoデフォルトでついてくるカラム。メールアドレスの確認をするとtrueになる。退会済みにしたい場合はFalseにする。
    is_superuser = models.BooleanField(
        null=False, default=False
    )  # djangoデフォルトでついてくるカラム。管理画面を含めた全ての権限が付与されているユーザー。退会済みにしたい場合はFalseにする。
    is_staff = models.BooleanField(
        null=False, default=False
    )  # djangoデフォルトでついてくるカラム。管理画面にログインできるようになる。管理画面Permissionsからアクセス権限を変更できる。
    is_admin = models.BooleanField(
        null=False, default=False
    )  # 会社毎の管理者かどうか。djangoデフォルトのカラムではない。会社情報を登録した時に、一緒に作成される最初のユーザーはis_adminがtrue。

    objects = CustomUserManager()

    # ユーザーのユニークなキーを記述します。ここではemailがユニークなフィールドとします。
    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    # graphql_authではemailとpasswordで認証するため、nameは認証の必須項目にはしない
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        db_table = "users"

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, verbose_name="ユーザー", on_delete=models.CASCADE)
    department = models.CharField("部署", max_length=30, blank=True, null=True)
    comment = models.TextField("コメント", blank=True, null=True, max_length=1000)
    image_key = models.CharField("S3内の画像保存キー", blank=True, null=True, max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "profiles"

    def __str__(self):
        return f"{self.user.name}のプロフィール"

    # S3の署名付きプロフィール画像URL
    def image_url(self):
        if self.image_key:
            return AmazonS3Service().generate_image_presigned_url(self.image_key)
        else:
            return None
