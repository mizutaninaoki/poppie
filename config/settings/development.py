from .base import *

import environ

BASE_DIR = Path(__file__).resolve().parent.parent.parent
env = environ.Env()
env.read_env(os.path.join(BASE_DIR, ".env.development"))

DATABASES = {
    "default": {
        "ENGINE": env("ENGINE"),
        "NAME": env("POSTGRES_DB"),
        "USER": env("POSTGRES_USER"),
        "PASSWORD": env("POSTGRES_PASSWORD"),
        "HOST": env("HOST"),
        "PORT": env("PORT"),
    }
}

DEBUG = True
