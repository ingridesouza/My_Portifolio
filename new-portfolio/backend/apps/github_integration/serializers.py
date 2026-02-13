from rest_framework import serializers
from .models import GitHubRepo, GitHubStats


class GitHubRepoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GitHubRepo
        fields = [
            'id', 'name', 'full_name', 'description', 'html_url', 'homepage',
            'language', 'topics', 'stars_count', 'forks_count',
            'watchers_count', 'is_fork', 'is_archived',
            'created_at', 'updated_at', 'pushed_at', 'is_featured'
        ]


class GitHubStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GitHubStats
        fields = [
            'total_repos', 'total_stars', 'total_forks',
            'total_followers', 'total_following',
            'public_repos', 'public_gists',
            'total_contributions_last_year', 'contribution_streak',
            'contribution_calendar',
            'top_languages', 'profile_data', 'last_synced_at'
        ]
