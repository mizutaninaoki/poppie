from pathlib import Path
import environ
import os
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()
env.read_env(os.path.join(BASE_DIR, ".env"))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",
    "phonenumber_field",
    "account",
    "app",
    "corsheaders",
    "graphene_django",
    "graphql_auth",
    "graphql_jwt.refresh_token.apps.RefreshTokenConfig",
    "django_filters",
    "storages",
]

# CorsMiddlewareはCommonMiddleWareより上に挿入
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
AUTH_USER_MODEL = "account.User"

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators
# パスワードのバリデーション設定
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 8,
        },
    },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    # },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = "ja"

TIME_ZONE = "Asia/Tokyo"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


GRAPHENE = {
    # configというプロジェクトを作成して、schemaというファイルを作成しています。
    # TODO: 後でconfig配下にschema.py作成し、accountとapp配下のschema.pyをまとめる
    "SCHEMA": "config.schema.schema",
    "MIDDLEWARE": [
        # 追加
        "graphql_jwt.middleware.JSONWebTokenMiddleware",
    ],
}

AUTHENTICATION_BACKENDS = [
    # 'graphql_jwt.backends.JSONWebTokenBackend', # graphql_authのロジックを使うためこちらはコメントアウト
    "graphql_auth.backends.GraphQLAuthBackend",  # graphql_authの認証ロジックを使用
    "django.contrib.auth.backends.ModelBackend",
]

GRAPHQL_JWT = {
    "JWT_VERIFY_EXPIRATION": True,  # リフレッシュトークン発行を許可
    "JWT_LONG_RUNNING_REFRESH_TOKEN": True,
    "JWT_EXPIRATION_DELTA": timedelta(minutes=5),  # JWTの有効期間(フロントのクッキーの有効期限も同じく5分に設定)
    "JWT_REFRESH_EXPIRATION_DELTA": timedelta(days=7),  # リフレッシュトークンの有効期間
    # 'JWT_COOKIE_SECURE': True, httpsのみ許可する
    # 'JWT_COOKIE_DOMAIN': 'None',
    # 'ALLOW_LOGIN_NOT_VERIFIED': True, メールアドレス確認無しでログイン可能にする
    "JWT_ALLOW_ARGUMENT": True,
    # 'JWT_COOKIE_SAMESITE': 'None',
    "JWT_COOKIE_SAMESITE": "Lax",
    "JWT_COOKIE_SECURE": False,
    # graphql_authの中で有効化するクラスの設定
    "JWT_ALLOW_ANY_CLASSES": [
        # "graphql_auth.mutations.Register",
        "graphql_auth.mutations.VerifyAccount",
        "graphql_auth.mutations.ResendActivationEmail",
        "graphql_auth.mutations.SendPasswordResetEmail",
        "graphql_auth.mutations.PasswordReset",
        "graphql_auth.mutations.ObtainJSONWebToken",
        "graphql_auth.mutations.VerifyToken",
        "graphql_auth.mutations.RefreshToken",
        "graphql_auth.mutations.RevokeToken",
        "graphql_auth.mutations.VerifySecondaryEmail",
    ],
}

# see: https://django-graphql-auth.readthedocs.io/en/latest/settings/
GRAPHQL_AUTH = {
    "ALLOW_LOGIN_NOT_VERIFIED": False,  # メールアドレス確認済（user.is_activeがTrue）でないとログインさせない。
    # ログイン時の入力必須項目
    # (passwordはデフォルトで対象になっており、必ず必須で無しにはできない。passwordとemailをログイン時の入力項目に設定)
    "LOGIN_ALLOWED_FIELDS": ["email"],
    # userレコードに対してどのカラムをユニークにして区別するか。デフォルトはusernameだが、今回はemailを指定。
    "USERNAME_FIELD": ["email"],
    # 新規作成時に入力必須項目
    "REGISTER_MUTATION_FIELDS": ["email", "name", "company"],
    # 'REGISTER_MUTATION_FIELDS': ['email', 'name'],
    # 新規作成時の非必須入力項目
    "REGISTER_MUTATION_FIELDS_OPTIONAL": [],
    # オプションで付与するfield。デフォルトではfirst_nameとlast_nameが指定されているが、
    # poppieでは使用しないため空のリストでオーバーライド。
    "UPDATE_MUTATION_FIELDS": [],
    #  userテーブルへのアクセス設定
    # 以下でgraphql_authが用意したuserとusersクエリで含めたい、除外したいカラムを指定できる
    # /Users/mizutani/.local/share/virtualenvs/poppie-xvNcFcTf/lib/python3.9/site-packages/graphql_auth/schema.py
    "USER_NODE_FILTER_FIELDS": {
        "id": [
            "exact",
        ],
        "email": [
            "exact",
        ],
        "name": ["exact", "icontains", "istartswith"],
        "is_active": ["exact"],
        "is_admin": ["exact"],
        # ログイン状態を管理するgraqhql_auth_userstatusテーブルのカラムへのアクセス設定
        "status__archived": ["exact"],
        "status__verified": ["exact"],
        "status__secondary_email": ["exact"],
    },
}

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


# ログ設定(開発環境。Djangoのマネージャのログもコンソールに出力するよう、djangoのhandlersもlevelをDEBUGにしている。)

# version
# お約束の文言で「現在有効な値は 1 だけ」なので、1をセットしておく。

# disable_existing_loggers”: False
# 既存ロガーを無効化する設定です。デフォルト値はTrueですが、予期せぬ問題が発生しないようにFalseにしておきます。

# SureamHandler
# SureamHandlerはコンソールへ出力するハンドラです。
# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,

#     "loggers": {
#         "django": {
#             "handlers": ["console"],
#             "level": "DEBUG"
#         },
#         "slot_data": {
#             "handlers": ["console"],
#             "level": "DEBUG"
#         },
#     },
#     "handlers": {
#         "console": {
#             "level": "INFO",
#             "class": "logging.StreamHandler",
#             "formatter": "dev"
#         },
#     },
#     "formatters": {
#         "dev": {
#             "format": "\t".join([
#                 "%(asctime)s",
#                 "[%(levelname)s]",
#                 "%(pathname)s(Line:%(lineno)d)",
#                 "%(message)s"
#             ])
#         },
#     }
# }


# ログはRailsのように表示できるようにしている
# see: https://book-reviews.blog/configure-logging-like-Rails-on-Django/
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "color": {
            "()": "colorlog.ColoredFormatter",
            "format": "%(log_color)s%(levelname)-8s %(message)s",
            "log_colors": {
                "DEBUG": "purple",
                "INFO": "white",
                "WARNING": "yellow",
                "ERROR": "red",
                "CRITICAL": "bold_red",
            },
        },
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "color",
        }
    },
    "loggers": {
        "django.db.backends": {
            "level": "DEBUG",
            "handlers": ["console"],
        },
    },
}


MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"


# AWS 共通の設定
AWS_S3_ACCESS_KEY_ID = env("AWS_S3_ACCESS_KEY_ID")
AWS_S3_SECRET_ACCESS_KEY = env("AWS_S3_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = env("AWS_REGION_NAME")

# 静的ファイルの設定
AWS_LOCATION = "static"
STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"

# メディアファイルの設定。今回は「app」というプロジェクト名の例
DEFAULT_FILE_STORAGE = "app.backends.MediaStorage"
