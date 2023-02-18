#!/bin/sh

# ./db-reset.sh
# python manage.py custom_createsuperuser --name admin --email admin@example.com --password password


#------------------------------
# DBがPostgresの場合
# 参照：https://mattsegal.dev/reset-django-local-database.html
#      https://django-extensions.readthedocs.io/en/latest/reset_db.html
#------------------------------

set -e

echo -e "\n>>> Resetting the database"
# --noinputでコマンドラインでの確認メッセージを無しにする。TablePlus等でPostgresにセッションを繋げていたら失敗するため、--close-sessionsで強制的にセッションを終了させる。
python manage.py reset_db --noinput --close-sessions

echo -e "\n>>> Running migrations"
python manage.py migrate

echo -e "\n>>> Database migrate finished."

echo -e "\n>>> Seed finished."
python manage.py seed
