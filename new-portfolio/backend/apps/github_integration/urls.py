from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GitHubRepoViewSet, GitHubStatsView, GitHubSyncView

router = DefaultRouter()
router.register('repos', GitHubRepoViewSet, basename='github-repo')

urlpatterns = [
    path('stats/', GitHubStatsView.as_view(), name='github-stats'),
    path('sync/', GitHubSyncView.as_view(), name='github-sync'),
    path('repos/featured/', GitHubRepoViewSet.as_view({'get': 'featured'}), name='github-repos-featured'),
    path('', include(router.urls)),
]
