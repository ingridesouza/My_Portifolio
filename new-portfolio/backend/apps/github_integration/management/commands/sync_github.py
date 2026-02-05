from django.core.management.base import BaseCommand
from apps.github_integration.services import GitHubService


class Command(BaseCommand):
    help = 'Sync GitHub repositories and statistics'

    def handle(self, *args, **options):
        self.stdout.write('Starting GitHub sync...')

        service = GitHubService()

        if not service.is_configured():
            self.stdout.write(
                self.style.ERROR('GitHub integration not configured. Check GITHUB_TOKEN and GITHUB_USERNAME in .env')
            )
            return

        self.stdout.write(f'Syncing data for user: {service.username}')

        if service.sync_all():
            self.stdout.write(self.style.SUCCESS('GitHub sync completed successfully!'))
        else:
            self.stdout.write(self.style.ERROR('GitHub sync failed. Check logs for details.'))
