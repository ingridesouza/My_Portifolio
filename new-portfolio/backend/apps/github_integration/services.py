from github import Github
from django.conf import settings
from .models import GitHubRepo, GitHubStats
import logging
import requests

logger = logging.getLogger(__name__)

GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'


class GitHubService:
    """Service for GitHub API integration"""

    def __init__(self):
        self.token = settings.GITHUB_TOKEN
        self.username = settings.GITHUB_USERNAME
        self.client = None

        if self.token:
            self.client = Github(self.token)

    def is_configured(self):
        """Check if GitHub integration is configured"""
        return bool(self.token and self.username)

    def sync_repositories(self):
        """Sync all public repositories"""
        if not self.is_configured():
            logger.warning("GitHub integration not configured")
            return False

        try:
            user = self.client.get_user(self.username)

            for repo in user.get_repos(type='public'):
                if repo.private:
                    continue

                GitHubRepo.objects.update_or_create(
                    repo_id=repo.id,
                    defaults={
                        'name': repo.name,
                        'full_name': repo.full_name,
                        'description': repo.description or '',
                        'html_url': repo.html_url,
                        'homepage': repo.homepage or '',
                        'language': repo.language or '',
                        'topics': repo.get_topics(),
                        'stars_count': repo.stargazers_count,
                        'forks_count': repo.forks_count,
                        'watchers_count': repo.watchers_count,
                        'open_issues_count': repo.open_issues_count,
                        'is_fork': repo.fork,
                        'is_archived': repo.archived,
                        'created_at': repo.created_at,
                        'updated_at': repo.updated_at,
                        'pushed_at': repo.pushed_at,
                    }
                )

            logger.info(f"Successfully synced repositories for {self.username}")
            return True

        except Exception as e:
            logger.error(f"Error syncing repositories: {e}")
            return False

    def sync_user_stats(self):
        """Sync user profile statistics"""
        if not self.is_configured():
            logger.warning("GitHub integration not configured")
            return False

        try:
            user = self.client.get_user(self.username)

            # Calculate language stats
            languages = {}
            total_stars = 0
            total_forks = 0

            for repo in user.get_repos():
                if repo.language:
                    languages[repo.language] = languages.get(repo.language, 0) + 1
                total_stars += repo.stargazers_count
                total_forks += repo.forks_count

            # Sort languages by frequency
            top_languages = dict(
                sorted(languages.items(), key=lambda x: x[1], reverse=True)[:10]
            )

            stats = GitHubStats.load()
            stats.total_repos = user.public_repos
            stats.total_stars = total_stars
            stats.total_forks = total_forks
            stats.total_followers = user.followers
            stats.total_following = user.following
            stats.public_repos = user.public_repos
            stats.public_gists = user.public_gists
            stats.top_languages = top_languages
            stats.profile_data = {
                'name': user.name,
                'bio': user.bio,
                'blog': user.blog,
                'company': user.company,
                'location': user.location,
                'avatar_url': user.avatar_url,
                'html_url': user.html_url,
            }
            stats.save()

            logger.info(f"Successfully synced stats for {self.username}")
            return True

        except Exception as e:
            logger.error(f"Error syncing user stats: {e}")
            return False

    def fetch_contribution_calendar(self):
        """Fetch contribution calendar data via GraphQL API"""
        if not self.is_configured():
            logger.warning("GitHub integration not configured")
            return None

        query = """
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                                weekday
                                color
                            }
                        }
                    }
                }
            }
        }
        """

        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json',
        }

        try:
            response = requests.post(
                GITHUB_GRAPHQL_URL,
                json={'query': query, 'variables': {'username': self.username}},
                headers=headers
            )
            response.raise_for_status()
            data = response.json()

            if 'errors' in data:
                logger.error(f"GraphQL errors: {data['errors']}")
                return None

            calendar_data = data['data']['user']['contributionsCollection']['contributionCalendar']
            logger.info(f"Successfully fetched contribution calendar for {self.username}")
            return calendar_data

        except Exception as e:
            logger.error(f"Error fetching contribution calendar: {e}")
            return None

    def sync_contribution_calendar(self):
        """Sync contribution calendar to database"""
        calendar_data = self.fetch_contribution_calendar()
        if calendar_data:
            stats = GitHubStats.load()
            stats.contribution_calendar = calendar_data
            stats.total_contributions_last_year = calendar_data.get('totalContributions', 0)
            stats.save()
            return True
        return False

    def sync_all(self):
        """Sync both repositories and stats"""
        repos_ok = self.sync_repositories()
        stats_ok = self.sync_user_stats()
        calendar_ok = self.sync_contribution_calendar()
        return repos_ok and stats_ok and calendar_ok
