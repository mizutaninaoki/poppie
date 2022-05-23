#!/bin/sh
cd account
rm -dr migrations/
cd ..

cd app
rm -dr migrations/
cd ..

rm -dr db.sqlite3
python manage.py makemigrations app account
python manage.py migrate
