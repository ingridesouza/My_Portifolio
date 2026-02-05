from rest_framework import serializers
from .models import Experience, ExperienceHighlight
from apps.skills.serializers import SkillMinimalSerializer


class ExperienceHighlightSerializer(serializers.ModelSerializer):
    description = serializers.SerializerMethodField()

    class Meta:
        model = ExperienceHighlight
        fields = ['id', 'description', 'order']

    def get_description(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_description(lang)


class ExperienceSerializer(serializers.ModelSerializer):
    position = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    highlights = ExperienceHighlightSerializer(many=True, read_only=True)
    technologies = SkillMinimalSerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = [
            'id', 'company_name', 'company_logo', 'company_url',
            'position', 'location', 'employment_type', 'description',
            'start_date', 'end_date', 'is_current',
            'technologies', 'highlights'
        ]

    def get_position(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_position(lang)

    def get_description(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_description(lang)
