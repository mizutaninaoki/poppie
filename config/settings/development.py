from pathlib import Path
import os
import environ

BASE_DIR = Path(__file__).resolve().parent.parent.parent
env = environ.Env()
env.read_env(os.path.join(BASE_DIR, ".env.development"))

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS").split(" ")

DATABASES = {
    "default": {
        "ENGINE": env("ENGINE"),
        "NAME": env("POSTGRES_DB"),
        "USER": env("POSTGRES_USER"),
        "PASSWORD": env("POSTGRES_PASSWORD"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT"),
    }
}

DEBUG = True

# CORSの設定
# CORS_ALLOW_ALL_ORIGINS = True // CORSを無効化する場合
# CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS").split(" ")
# ORS_ALLOW_CREDENTIALSは、Trueに設定する事でCookie をクロスオリジンの HTTP リクエストに含めることができます
CORS_ALLOW_CREDENTIALS = True

# AWS 共通の設定
AWS_S3_ACCESS_KEY_ID = env("AWS_S3_ACCESS_KEY_ID")
AWS_S3_SECRET_ACCESS_KEY = env("AWS_S3_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = env("AWS_REGION_NAME")

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/mediafiles/"
