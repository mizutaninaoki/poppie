from .base import *

env_name = os.environ.get("ENV_NAME")

# 環境変数ENV_NAMEによって、ロードする設定ファイルを変更
if env_name == "production":
    from .production import *
elif env_name == "test":
    from .test import *
elif env_name == "development" or env_name == None:
    from .development import *
