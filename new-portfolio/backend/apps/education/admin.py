from django.contrib import admin
from .models import Education, Certification


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['institution', 'degree_name', 'degree_type', 'start_date', 'is_current', 'is_active']
    list_filter = ['degree_type', 'is_current', 'is_active']
    search_fields = ['institution', 'degree_name']
    filter_horizontal = ['skills_learned']

    fieldsets = (
        ('Institution', {
            'fields': ('institution', 'institution_logo', 'institution_url')
        }),
        ('Degree', {
            'fields': ('degree_type', 'degree_name', 'degree_name_en', 'degree_name_fr', 'field_of_study')
        }),
        ('Description', {
            'fields': ('description', 'description_en', 'description_fr')
        }),
        ('Duration', {
            'fields': ('start_date', 'end_date', 'is_current')
        }),
        ('Skills', {
            'fields': ('skills_learned',)
        }),
        ('Display', {
            'fields': ('order', 'is_active')
        }),
    )


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'issuing_organization', 'issue_date', 'is_active']
    list_filter = ['issuing_organization', 'is_active']
    search_fields = ['name', 'issuing_organization']

    fieldsets = (
        ('Certification', {
            'fields': ('name', 'name_en', 'name_fr')
        }),
        ('Organization', {
            'fields': ('issuing_organization', 'organization_logo')
        }),
        ('Dates', {
            'fields': ('issue_date', 'expiration_date')
        }),
        ('Credentials', {
            'fields': ('credential_id', 'credential_url', 'certificate_file')
        }),
        ('Display', {
            'fields': ('order', 'is_active')
        }),
    )
