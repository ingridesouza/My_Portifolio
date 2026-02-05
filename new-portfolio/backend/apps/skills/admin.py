from django.contrib import admin
from .models import SkillCategory, Skill


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'order', 'is_active']
    list_filter = ['type', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['name']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'is_featured', 'order', 'is_active']
    list_filter = ['category', 'is_featured', 'is_active']
    list_editable = ['proficiency', 'is_featured', 'order', 'is_active']
    search_fields = ['name', 'description']

    fieldsets = (
        ('Basic Info', {
            'fields': ('category', 'name', 'name_en', 'name_fr')
        }),
        ('Description', {
            'fields': ('description', 'description_en', 'description_fr')
        }),
        ('Visuals', {
            'fields': ('proficiency', 'icon_class', 'icon_svg', 'color', 'years_experience')
        }),
        ('Display', {
            'fields': ('order', 'is_featured', 'is_active')
        }),
    )
