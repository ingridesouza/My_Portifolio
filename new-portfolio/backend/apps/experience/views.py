from rest_framework import viewsets
from .models import Experience
from .serializers import ExperienceSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    """Experience API"""
    queryset = Experience.objects.filter(is_active=True)
    serializer_class = ExperienceSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'pt-br')
        return context
