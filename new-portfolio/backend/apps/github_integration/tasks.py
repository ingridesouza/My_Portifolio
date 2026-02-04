from celery import shared_task
from .services import GitHubService
import logging

logger = logging.getLogger(__name__)


@shared_task
def sync_github_data():
    """Scheduled task to sync GitHub data"""
    service = GitHubService()

    if not service.is_configured():
        logger.warning("GitHub integration not configured, skipping sync")
        return "Skipped - not configured"

    success = service.sync_all()

    if success:
        return "GitHub data synced successfully"
    else:
        return "GitHub sync completed with errors"


@shared_task
def sync_github_repos():
    """Sync only repositories"""
    service = GitHubService()
    service.sync_repositories()
    return "Repositories synced"


@shared_task
def sync_github_stats():
    """Sync only stats"""
    service = GitHubService()
    service.sync_user_stats()
    return "Stats synced"
