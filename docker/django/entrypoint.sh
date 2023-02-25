#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# python manage.py flush --no-input
# python manage.py migrate
# python manage.py collectstatic --no-input --clear


# DBリセット & シード生成（初回デプロイやDBの初期化をする時、有効化する）
if "$DB_RESET_AND_SEED"; then
  echo "seed environment valid"
  # DBリセット&シード生成実行
  ./seed.sh
else
  echo "no db reset and generate seed"
fi

exec "$@"
