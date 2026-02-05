from rest_framework import serializers
from .models import Project, ProjectFeature, ProjectImage, ProjectLink
from apps.skills.serializers import SkillMinimalSerializer


class ProjectFeatureSerializer(serializers.ModelSerializer):
    description = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFeature
        fields = ['id', 'description', 'order']

    def get_description(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_description(lang)


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']


class ProjectLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectLink
        fields = ['type', 'url', 'icon_class']


class ProjectListSerializer(serializers.ModelSerializer):
    """Serializer for project list"""
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    technologies = SkillMinimalSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'slug', 'title', 'short_description',
            'thumbnail', 'year', 'is_featured', 'technologies',
            'github_repo', 'live_url'
        ]

    def get_title(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_title(lang)

    def get_short_description(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_short_description(lang)


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer for project detail"""
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    full_description = serializers.SerializerMethodField()
    features = ProjectFeatureSerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    links = ProjectLinkSerializer(many=True, read_only=True)
    technologies = SkillMinimalSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'slug', 'title', 'short_description', 'full_description',
            'thumbnail', 'status', 'project_type', 'technologies',
            'github_repo', 'live_url', 'case_study_url',
            'year', 'start_date', 'end_date',
            'features', 'images', 'links', 'is_featured'
        ]

    def get_title(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_title(lang)

    def get_short_description(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_short_description(lang)

    def get_full_description(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_full_description(lang)


class ProjectTerminalSerializer(serializers.ModelSerializer):
    """Serializer for terminal commands"""
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    features = serializers.SerializerMethodField()
    technologies = serializers.StringRelatedField(many=True)
    links = ProjectLinkSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'slug', 'title', 'description', 'year',
            'technologies', 'features', 'links'
        ]

    def get_title(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_title(lang)

    def get_description(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_full_description(lang)

    def get_features(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return [f.get_description(lang) for f in obj.features.all()]
