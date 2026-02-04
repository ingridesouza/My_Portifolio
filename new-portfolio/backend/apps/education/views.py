from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Education, Certification
from .serializers import EducationSerializer, CertificationSerializer


class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    """Education API"""
    queryset = Education.objects.filter(is_active=True)
    serializer_class = EducationSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'pt-br')
        return context

    @action(detail=False, methods=['get'])
    def certifications(self, request):
        """Get all certifications"""
        certifications = Certification.objects.filter(is_active=True)
        serializer = CertificationSerializer(
            certifications,
            many=True,
            context=self.get_serializer_context()
        )
        return Response(serializer.data)
