from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, SkillCategoryViewSet

router = DefaultRouter()
router.register('', SkillViewSet, basename='skill')

urlpatterns = [
    path('categories/', SkillCategoryViewSet.as_view({'get': 'list'}), name='skill-categories'),
    path('categories/by-type/<str:type>/', SkillCategoryViewSet.as_view({'get': 'by_type'}), name='skills-by-type'),
    path('featured/', SkillViewSet.as_view({'get': 'featured'}), name='skills-featured'),
    path('', include(router.urls)),
]
