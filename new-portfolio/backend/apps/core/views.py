import os
from io import StringIO
from django.core.management import call_command
from django.conf import settings
from rest_framework import viewsets, views, status
from rest_framework.response import Response
from .models import SiteSettings, Translation
from .serializers import SiteSettingsSerializer, TranslationSerializer


class SiteSettingsView(views.APIView):
    """Get site settings"""

    def get(self, request):
        settings = SiteSettings.load()
        serializer = SiteSettingsSerializer(settings)
        return Response(serializer.data)


class MigrateView(views.APIView):
    """Temporary endpoint to run migrations - remove after first use"""

    def get(self, request):
        secret = request.query_params.get('secret', '')
        if secret != settings.SECRET_KEY:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        out = StringIO()
        try:
            call_command('migrate', stdout=out, stderr=out)
            return Response({'status': 'success', 'output': out.getvalue()})
        except Exception as e:
            return Response({'status': 'error', 'message': str(e), 'output': out.getvalue()},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TranslationViewSet(viewsets.ReadOnlyModelViewSet):
    """List all translations"""
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer

    def list(self, request):
        """Return translations as key-value dict for specified language"""
        lang = request.query_params.get('lang', 'pt-br')
        translations = {}
        for t in self.get_queryset():
            translations[t.key] = t.get_translation(lang)
        return Response(translations)
