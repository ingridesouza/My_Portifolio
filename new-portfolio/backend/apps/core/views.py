from rest_framework import viewsets, views
from rest_framework.response import Response
from .models import SiteSettings, Translation
from .serializers import SiteSettingsSerializer, TranslationSerializer


class SiteSettingsView(views.APIView):
    """Get site settings"""

    def get(self, request):
        settings = SiteSettings.load()
        serializer = SiteSettingsSerializer(settings)
        return Response(serializer.data)


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
