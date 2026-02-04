from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import SkillCategory, Skill
from .serializers import SkillCategorySerializer, SkillSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """Skills API"""
    queryset = Skill.objects.filter(is_active=True)
    serializer_class = SkillSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'pt-br')
        return context

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured skills"""
        skills = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(skills, many=True)
        return Response(serializer.data)


class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Skill Categories API"""
    queryset = SkillCategory.objects.filter(is_active=True)
    serializer_class = SkillCategorySerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'pt-br')
        return context

    @action(detail=False, methods=['get'], url_path='by-type/(?P<type>[^/.]+)')
    def by_type(self, request, type=None):
        """Get categories by type"""
        categories = self.get_queryset().filter(type=type)
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)
