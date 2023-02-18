#------------------------------
# DBがsqliteの場合
#------------------------------
# #!/bin/sh
# cd account
# rm -dr migrations/
# cd ..

# cd app
# rm -dr migrations/
# cd ..

# rm -dr db.sqlite3
# python manage.py makemigrations app account
# python manage.py migrate



# #------------------------------
# # DBがPostgresの場合
# # 参照：https://mattsegal.dev/reset-django-local-database.html
# #      https://django-extensions.readthedocs.io/en/latest/reset_db.html
# #------------------------------
# #!/bin/sh

# set -e

# echo -e "\n>>> Resetting the database"
# # --noinputでコマンドラインでの確認メッセージを無しにする。TablePlus等でPostgresにセッションを繋げていたら失敗するため、--close-sessionsで強制的にセッションを終了させる。
# python manage.py reset_db --noinput --close-sessions

# echo -e "\n>>> Running migrations"
# python manage.py migrate

# echo -e "\n>>> Database migrate finished."