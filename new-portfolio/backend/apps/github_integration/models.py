from django.db import models


class GitHubRepo(models.Model):
    """Synced GitHub repositories"""
    repo_id = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=100)
    full_name = models.CharField(max_length=200)

    description = models.TextField(blank=True)
    html_url = models.URLField()
    homepage = models.URLField(blank=True)

    language = models.CharField(max_length=50, blank=True)
    topics = models.JSONField(default=list)

    stars_count = models.PositiveIntegerField(default=0)
    forks_count = models.PositiveIntegerField(default=0)
    watchers_count = models.PositiveIntegerField(default=0)
    open_issues_count = models.PositiveIntegerField(default=0)

    is_fork = models.BooleanField(default=False)
    is_private = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)

    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    pushed_at = models.DateTimeField(null=True, blank=True)

    # Internal control
    is_featured = models.BooleanField(default=False)
    is_hidden = models.BooleanField(default=False)
    linked_project = models.OneToOneField(
        'projects.Project',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='github_repo_data'
    )

    last_synced_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-pushed_at', '-stars_count']
        verbose_name = "GitHub Repository"
        verbose_name_plural = "GitHub Repositories"

    def __str__(self):
        return self.full_name


class GitHubStats(models.Model):
    """GitHub profile statistics - Singleton"""
    total_repos = models.PositiveIntegerField(default=0)
    total_stars = models.PositiveIntegerField(default=0)
    total_forks = models.PositiveIntegerField(default=0)
    total_followers = models.PositiveIntegerField(default=0)
    total_following = models.PositiveIntegerField(default=0)

    public_repos = models.PositiveIntegerField(default=0)
    public_gists = models.PositiveIntegerField(default=0)

    total_contributions_last_year = models.PositiveIntegerField(default=0)
    contribution_streak = models.PositiveIntegerField(default=0)

    top_languages = models.JSONField(default=dict)
    profile_data = models.JSONField(default=dict)

    last_synced_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "GitHub Stats"
        verbose_name_plural = "GitHub Stats"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return f"GitHub Stats (Last synced: {self.last_synced_at})"
