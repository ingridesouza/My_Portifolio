from django.contrib import admin
from .models import Profile, SocialLink


class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 1


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'professional_title', 'email', 'is_available_for_hire']
    inlines = [SocialLinkInline]

    fieldsets = (
        ('Basic Info', {
            'fields': ('full_name', 'photo', 'photo_alt', 'location', 'email', 'phone')
        }),
        ('Professional Title', {
            'fields': ('professional_title', 'professional_title_en', 'professional_title_fr')
        }),
        ('Short Bio (Hero)', {
            'fields': ('bio_short', 'bio_short_en', 'bio_short_fr')
        }),
        ('Full Bio (About)', {
            'fields': ('bio_full', 'bio_full_en', 'bio_full_fr')
        }),
        ('Links', {
            'fields': ('github_username', 'linkedin_url', 'instagram_url', 'resume_pdf')
        }),
        ('Status', {
            'fields': ('is_available_for_hire',)
        }),
    )

    def has_add_permission(self, request):
        return not Profile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'display_name', 'order', 'is_active']
    list_filter = ['platform', 'is_active']
    list_editable = ['order', 'is_active']
