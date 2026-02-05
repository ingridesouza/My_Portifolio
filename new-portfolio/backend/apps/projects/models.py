from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    """Portfolio projects"""
    STATUS_CHOICES = [
        ('development', 'In Development'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ]

    PROJECT_TYPES = [
        ('personal', 'Personal'),
        ('professional', 'Professional'),
        ('open_source', 'Open Source'),
        ('freelance', 'Freelance'),
    ]

    slug = models.SlugField(unique=True, max_length=50)

    title = models.CharField(max_length=100)
    title_en = models.CharField(max_length=100, blank=True)
    title_fr = models.CharField(max_length=100, blank=True)

    short_description = models.CharField(max_length=200)
    short_description_en = models.CharField(max_length=200, blank=True)
    short_description_fr = models.CharField(max_length=200, blank=True)

    full_description = models.TextField()
    full_description_en = models.TextField(blank=True)
    full_description_fr = models.TextField(blank=True)

    thumbnail = models.ImageField(upload_to='projects/thumbnails/', blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES, default='personal')

    technologies = models.ManyToManyField(
        'skills.Skill',
        related_name='projects',
        blank=True
    )

    github_repo = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    case_study_url = models.URLField(blank=True)

    year = models.PositiveIntegerField()
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    is_featured = models.BooleanField(default=False)
    is_from_github = models.BooleanField(default=False)
    github_repo_id = models.PositiveIntegerField(null=True, blank=True)

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-year', 'order']
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_title(self, lang='pt-br'):
        if lang == 'en' and self.title_en:
            return self.title_en
        if lang == 'fr' and self.title_fr:
            return self.title_fr
        return self.title

    def get_short_description(self, lang='pt-br'):
        if lang == 'en' and self.short_description_en:
            return self.short_description_en
        if lang == 'fr' and self.short_description_fr:
            return self.short_description_fr
        return self.short_description

    def get_full_description(self, lang='pt-br'):
        if lang == 'en' and self.full_description_en:
            return self.full_description_en
        if lang == 'fr' and self.full_description_fr:
            return self.full_description_fr
        return self.full_description


class ProjectFeature(models.Model):
    """Project features/highlights"""
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='features'
    )

    description = models.CharField(max_length=200)
    description_en = models.CharField(max_length=200, blank=True)
    description_fr = models.CharField(max_length=200, blank=True)

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Project Feature"
        verbose_name_plural = "Project Features"

    def __str__(self):
        return self.description[:50]

    def get_description(self, lang='pt-br'):
        if lang == 'en' and self.description_en:
            return self.description_en
        if lang == 'fr' and self.description_fr:
            return self.description_fr
        return self.description


class ProjectImage(models.Model):
    """Project gallery images"""
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Project Image"
        verbose_name_plural = "Project Images"


class ProjectLink(models.Model):
    """Project related links"""
    LINK_TYPES = [
        ('demo', 'Demo'),
        ('code', 'Code'),
        ('docs', 'Documentation'),
        ('video', 'Video'),
        ('case_study', 'Case Study'),
    ]

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='links'
    )
    type = models.CharField(max_length=20, choices=LINK_TYPES)
    url = models.URLField()
    icon_class = models.CharField(max_length=50, blank=True)

    class Meta:
        ordering = ['type']
        verbose_name = "Project Link"
        verbose_name_plural = "Project Links"

    def __str__(self):
        return f"{self.type}: {self.url}"
