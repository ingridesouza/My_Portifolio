from django.contrib import admin
from .models import SiteSettings, Translation


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'maintenance_mode', 'updated_at']

    def has_add_permission(self, request):
        # Only allow one instance
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Translation)
class TranslationAdmin(admin.ModelAdmin):
    list_display = ['key', 'pt_br', 'en']
    search_fields = ['key', 'pt_br', 'en']
    list_filter = ['key']
