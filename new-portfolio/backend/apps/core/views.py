from django.conf import settings as django_settings
from django.contrib.auth.models import User
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


class SetupView(views.APIView):
    """Temporary endpoint for initial setup - remove after use"""

    def get(self, request):
        secret = request.query_params.get('secret', '')
        if secret != django_settings.SECRET_KEY:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        action = request.query_params.get('action', '')
        results = {}

        if action == 'createsuperuser':
            username = request.query_params.get('username', 'admin')
            password = request.query_params.get('password', '')
            email = request.query_params.get('email', '')
            if not password:
                return Response({'error': 'password is required'}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(username=username).exists():
                results['superuser'] = f'User {username} already exists'
            else:
                User.objects.create_superuser(username=username, email=email, password=password)
                results['superuser'] = f'Created superuser: {username}'

        elif action == 'github_sync':
            from apps.github_integration.services import GitHubService
            service = GitHubService()
            if not service.is_configured():
                return Response({'error': 'GitHub not configured'}, status=status.HTTP_400_BAD_REQUEST)
            success = service.sync_all()
            results['github_sync'] = 'success' if success else 'failed'

        elif action == 'seed':
            from io import StringIO
            from django.core.management import call_command
            out = StringIO()
            try:
                call_command('seed_data', stdout=out)
                results['seed'] = 'success'
                results['output'] = out.getvalue()
            except Exception as e:
                return Response({'error': str(e), 'output': out.getvalue()},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            results['available_actions'] = ['createsuperuser', 'github_sync', 'seed']
            results['examples'] = {
                'createsuperuser': '?secret=KEY&action=createsuperuser&username=admin&password=PASS&email=EMAIL',
                'github_sync': '?secret=KEY&action=github_sync',
                'seed': '?secret=KEY&action=seed',
            }

        return Response(results)


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
