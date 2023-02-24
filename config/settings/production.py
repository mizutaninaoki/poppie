from pathlib import Path
import os
import environ

BASE_DIR = Path(__file__).resolve().parent.parent.parent
env = environ.Env()
env.read_env(os.path.join(BASE_DIR, ".env.production"))

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

DEBUG = False

# CORSの設定
# CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS").split(" ")
# CORS_ALLOW_CREDENTIALS = True

# AWS 共通の設定
AWS_S3_ACCESS_KEY_ID = env("AWS_S3_ACCESS_KEY_ID")
AWS_S3_SECRET_ACCESS_KEY = env("AWS_S3_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = env("AWS_REGION_NAME")

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
