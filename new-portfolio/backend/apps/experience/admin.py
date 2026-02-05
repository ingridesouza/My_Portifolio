from django.contrib import admin
from .models import Experience, ExperienceHighlight


class ExperienceHighlightInline(admin.TabularInline):
    model = ExperienceHighlight
    extra = 1


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'position', 'start_date', 'is_current', 'is_active']
    list_filter = ['is_current', 'is_active']
    search_fields = ['company_name', 'position']
    filter_horizontal = ['technologies']
    inlines = [ExperienceHighlightInline]

    fieldsets = (
        ('Company', {
            'fields': ('company_name', 'company_logo', 'company_url', 'location')
        }),
        ('Position', {
            'fields': ('position', 'position_en', 'position_fr', 'employment_type')
        }),
        ('Description', {
            'fields': ('description', 'description_en', 'description_fr')
        }),
        ('Duration', {
            'fields': ('start_date', 'end_date', 'is_current')
        }),
        ('Technologies', {
            'fields': ('technologies',)
        }),
        ('Display', {
            'fields': ('order', 'is_active')
        }),
    )
