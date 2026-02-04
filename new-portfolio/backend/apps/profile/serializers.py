from rest_framework import serializers
from .models import Profile, SocialLink


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'platform', 'url', 'icon_class', 'display_name']


class ProfileSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many=True, read_only=True)
    professional_title = serializers.SerializerMethodField()
    bio_short = serializers.SerializerMethodField()
    bio_full = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'full_name', 'professional_title', 'location', 'email', 'phone',
            'photo', 'photo_alt', 'bio_short', 'bio_full', 'resume_pdf',
            'github_username', 'linkedin_url', 'instagram_url',
            'is_available_for_hire', 'social_links'
        ]

    def get_professional_title(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_professional_title(lang)

    def get_bio_short(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_bio_short(lang)

    def get_bio_full(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_bio_full(lang)
