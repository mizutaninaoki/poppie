#!/bin/sh
./db-reset.sh
# python manage.py custom_createsuperuser --name admin --email admin@example.com --password password

echo -e "\n>>> Seed finished."
python manage.py seed
