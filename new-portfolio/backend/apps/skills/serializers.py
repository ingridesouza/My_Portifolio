from rest_framework import serializers
from .models import SkillCategory, Skill


class SkillSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Skill
        fields = [
            'id', 'name', 'description', 'category_name',
            'proficiency', 'icon_class', 'icon_svg', 'color',
            'years_experience', 'is_featured'
        ]

    def get_name(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_name(lang)

    def get_description(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_description(lang)


class SkillMinimalSerializer(serializers.ModelSerializer):
    """Minimal serializer for relations"""
    class Meta:
        model = Skill
        fields = ['id', 'name', 'icon_class', 'color']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    name = serializers.SerializerMethodField()

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'type', 'icon_class', 'skills']

    def get_name(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_name(lang)
