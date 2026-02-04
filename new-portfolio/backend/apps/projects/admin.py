from django.contrib import admin
from .models import Project, ProjectFeature, ProjectImage, ProjectLink


class ProjectFeatureInline(admin.TabularInline):
    model = ProjectFeature
    extra = 1


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


class ProjectLinkInline(admin.TabularInline):
    model = ProjectLink
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'year', 'status', 'is_featured', 'is_active', 'order']
    list_filter = ['status', 'project_type', 'is_featured', 'is_active', 'year']
    list_editable = ['is_featured', 'is_active', 'order']
    search_fields = ['title', 'short_description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['technologies']
    inlines = [ProjectFeatureInline, ProjectLinkInline, ProjectImageInline]

    fieldsets = (
        ('Basic Info', {
            'fields': ('slug', 'title', 'title_en', 'title_fr', 'thumbnail')
        }),
        ('Short Description', {
            'fields': ('short_description', 'short_description_en', 'short_description_fr')
        }),
        ('Full Description', {
            'fields': ('full_description', 'full_description_en', 'full_description_fr')
        }),
        ('Classification', {
            'fields': ('status', 'project_type', 'year', 'start_date', 'end_date')
        }),
        ('Technologies', {
            'fields': ('technologies',)
        }),
        ('Links', {
            'fields': ('github_repo', 'live_url', 'case_study_url')
        }),
        ('Display', {
            'fields': ('order', 'is_featured', 'is_active', 'is_from_github', 'github_repo_id')
        }),
    )
