from django.contrib import admin
from django.utils.html import format_html
from .models import GitHubRepo, GitHubStats


@admin.register(GitHubRepo)
class GitHubRepoAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'language', 'stars_count', 'forks_count',
        'is_featured', 'is_hidden', 'pushed_at'
    ]
    list_filter = ['language', 'is_featured', 'is_hidden', 'is_fork', 'is_archived']
    list_editable = ['is_featured', 'is_hidden']
    search_fields = ['name', 'full_name', 'description']
    readonly_fields = [
        'repo_id', 'name', 'full_name', 'description', 'html_url',
        'homepage', 'language', 'topics', 'stars_count', 'forks_count',
        'watchers_count', 'open_issues_count', 'is_fork', 'is_private',
        'is_archived', 'created_at', 'updated_at', 'pushed_at', 'last_synced_at'
    ]

    def repo_link(self, obj):
        return format_html('<a href="{}" target="_blank">{}</a>', obj.html_url, obj.full_name)
    repo_link.short_description = 'GitHub Link'


@admin.register(GitHubStats)
class GitHubStatsAdmin(admin.ModelAdmin):
    list_display = [
        'total_repos', 'total_stars', 'total_followers', 'last_synced_at'
    ]
    readonly_fields = [
        'total_repos', 'total_stars', 'total_forks', 'total_followers',
        'total_following', 'public_repos', 'public_gists',
        'total_contributions_last_year', 'contribution_streak',
        'top_languages', 'profile_data', 'last_synced_at'
    ]

    def has_add_permission(self, request):
        return not GitHubStats.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
