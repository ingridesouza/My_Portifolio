from rest_framework import serializers
from .models import SiteSettings, Translation


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ['site_name', 'meta_description', 'meta_keywords', 'maintenance_mode']


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = ['key', 'pt_br', 'pt_pt', 'en', 'fr']
