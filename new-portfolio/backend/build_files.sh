#!/bin/bash

pip install -r requirements.txt
python manage.py collectstatic --noinput
mkdir -p staticfiles_build
cp -r staticfiles/* staticfiles_build/
