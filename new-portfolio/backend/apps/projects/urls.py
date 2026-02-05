from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TerminalCommandsView

router = DefaultRouter()
router.register('', ProjectViewSet, basename='project')

urlpatterns = [
    path('featured/', ProjectViewSet.as_view({'get': 'featured'}), name='projects-featured'),
    path('terminal/commands/', TerminalCommandsView.as_view(), name='terminal-commands'),
    path('terminal/execute/', TerminalCommandsView.as_view(), name='terminal-execute'),
    path('', include(router.urls)),
]
