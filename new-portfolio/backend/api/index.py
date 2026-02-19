import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.vercel')

from django.core.wsgi import get_wsgi_application

app = application = get_wsgi_application()
