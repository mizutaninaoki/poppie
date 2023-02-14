from .base import *

env_name = os.environ.get("ENV_NAME")

if env_name == "production":
    from .production import *
elif env_name == "test":
    from .test import *
elif env_name == "development" or env_name == None:
    from .development import *
