from rest_framework import viewsets, views, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from .models import GitHubRepo, GitHubStats
from .serializers import GitHubRepoSerializer, GitHubStatsSerializer
from .tasks import sync_github_data


class GitHubRepoViewSet(viewsets.ReadOnlyModelViewSet):
    """GitHub Repositories API"""
    queryset = GitHubRepo.objects.filter(is_hidden=False)
    serializer_class = GitHubRepoSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured repositories"""
        repos = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(repos, many=True)
        return Response(serializer.data)


class GitHubStatsView(views.APIView):
    """GitHub Stats API"""

    def get(self, request):
        stats = GitHubStats.load()
        serializer = GitHubStatsSerializer(stats)
        return Response(serializer.data)


class GitHubSyncView(views.APIView):
    """Trigger GitHub sync - Admin only"""
    permission_classes = [IsAdminUser]

    def post(self, request):
        task = sync_github_data.delay()
        return Response({
            'status': 'Sync started',
            'task_id': str(task.id)
        }, status=status.HTTP_202_ACCEPTED)
