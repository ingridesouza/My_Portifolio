from rest_framework import viewsets, views, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Project
from .serializers import (
    ProjectListSerializer,
    ProjectDetailSerializer,
    ProjectTerminalSerializer
)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """Projects API"""
    queryset = Project.objects.filter(is_active=True)
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'pt-br')
        return context

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects"""
        projects = self.get_queryset().filter(is_featured=True)
        serializer = ProjectListSerializer(
            projects,
            many=True,
            context=self.get_serializer_context()
        )
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='by-technology/(?P<skill_id>[^/.]+)')
    def by_technology(self, request, skill_id=None):
        """Get projects by technology"""
        projects = self.get_queryset().filter(technologies__id=skill_id)
        serializer = ProjectListSerializer(
            projects,
            many=True,
            context=self.get_serializer_context()
        )
        return Response(serializer.data)


class TerminalCommandsView(views.APIView):
    """Terminal commands API"""

    def get(self, request):
        """Get available commands"""
        commands = {
            'help': 'Show available commands',
            'destaques': 'List featured projects',
            'detalhes <slug>': 'Show project details',
            'tecnologias': 'List all technologies',
            'clear': 'Clear terminal',
        }
        return Response(commands)

    def post(self, request):
        """Execute terminal command"""
        command = request.data.get('command', '').strip().lower()
        lang = request.query_params.get('lang', 'pt-br')

        if not command:
            return Response({
                'type': 'error',
                'content': 'No command provided'
            })

        parts = command.split()
        base_cmd = parts[0]
        args = parts[1:] if len(parts) > 1 else []

        # Route commands
        if base_cmd == 'help':
            return self._cmd_help()
        elif base_cmd == 'destaques':
            return self._cmd_featured(lang)
        elif base_cmd == 'detalhes':
            return self._cmd_details(args, lang)
        elif base_cmd == 'tecnologias':
            return self._cmd_technologies(args, lang)
        elif base_cmd == 'clear':
            return Response({'type': 'clear', 'content': ''})
        else:
            return Response({
                'type': 'error',
                'content': f'Command not found: {base_cmd}. Type "help" for available commands.'
            })

    def _cmd_help(self):
        content = """Available Commands:
- help: Show this help message
- destaques: List featured projects
- detalhes <project-slug>: Show project details
- tecnologias: List all technologies used
- tecnologias <tech-name>: Filter projects by technology
- clear: Clear terminal"""
        return Response({'type': 'info', 'content': content})

    def _cmd_featured(self, lang):
        projects = Project.objects.filter(is_active=True, is_featured=True)
        if not projects.exists():
            return Response({
                'type': 'info',
                'content': 'No featured projects found.'
            })

        lines = ['Featured Projects:\n']
        for p in projects:
            lines.append(f'- {p.get_title(lang)} ({p.year}) - detalhes {p.slug}')

        return Response({
            'type': 'response',
            'content': '\n'.join(lines)
        })

    def _cmd_details(self, args, lang):
        if not args:
            return Response({
                'type': 'error',
                'content': 'Please specify a project. Example: detalhes watchtower'
            })

        slug = args[0]
        try:
            project = Project.objects.get(slug=slug, is_active=True)
        except Project.DoesNotExist:
            return Response({
                'type': 'error',
                'content': f'Project not found: {slug}. Type "destaques" to see available projects.'
            })

        serializer = ProjectTerminalSerializer(project, context={'lang': lang})
        return Response({
            'type': 'project',
            'content': serializer.data
        })

    def _cmd_technologies(self, args, lang):
        from apps.skills.models import Skill

        if args:
            # Filter by technology
            tech_name = ' '.join(args)
            projects = Project.objects.filter(
                is_active=True,
                technologies__name__icontains=tech_name
            ).distinct()

            if not projects.exists():
                return Response({
                    'type': 'error',
                    'content': f'No projects found with technology: {tech_name}'
                })

            lines = [f'Projects using {tech_name}:\n']
            for p in projects:
                lines.append(f'- {p.get_title(lang)} - detalhes {p.slug}')

            return Response({
                'type': 'response',
                'content': '\n'.join(lines)
            })
        else:
            # List all technologies
            skills = Skill.objects.filter(
                is_active=True,
                projects__isnull=False
            ).distinct()

            techs = [s.name for s in skills]
            return Response({
                'type': 'info',
                'content': 'Technologies: ' + ', '.join(techs)
            })
