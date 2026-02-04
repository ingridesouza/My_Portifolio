from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EducationViewSet

router = DefaultRouter()
router.register('', EducationViewSet, basename='education')

urlpatterns = [
    path('certifications/', EducationViewSet.as_view({'get': 'certifications'}), name='certifications'),
    path('', include(router.urls)),
]
