from .base import *

import environ

env = environ.Env()
env.read_env(os.path.join(BASE_DIR, ".env.development"))

DATABASES = {
    "default": {
        "ENGINE": env("ENGINE"),
        "NAME": env("NAME"),
        "USER": env("USER"),
        "PASSWORD": env("PASSWORD"),
        "HOST": env("HOST"),
        "PORT": env("PORT"),
    }
}

DEBUG = True
