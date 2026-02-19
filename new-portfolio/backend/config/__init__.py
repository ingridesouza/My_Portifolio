import os

if os.environ.get('DJANGO_SETTINGS_MODULE') != 'config.settings.vercel':
    from .celery import app as celery_app
    __all__ = ('celery_app',)
