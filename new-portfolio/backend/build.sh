#!/usr/bin/env bash
# Render build script for Django backend
set -o errexit

pip install --upgrade pip
pip install -r requirements/prod.txt

python manage.py collectstatic --noinput
python manage.py migrate
