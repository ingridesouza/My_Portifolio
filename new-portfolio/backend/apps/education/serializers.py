from rest_framework import serializers
from .models import Education, Certification
from apps.skills.serializers import SkillMinimalSerializer


class EducationSerializer(serializers.ModelSerializer):
    degree_name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    skills_learned = SkillMinimalSerializer(many=True, read_only=True)

    class Meta:
        model = Education
        fields = [
            'id', 'institution', 'institution_logo', 'institution_url',
            'degree_type', 'degree_name', 'field_of_study', 'description',
            'start_date', 'end_date', 'is_current', 'skills_learned'
        ]

    def get_degree_name(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_degree_name(lang)

    def get_description(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_description(lang)


class CertificationSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = [
            'id', 'name', 'issuing_organization', 'organization_logo',
            'issue_date', 'expiration_date', 'credential_id',
            'credential_url', 'certificate_file'
        ]

    def get_name(self, obj):
        lang = self.context.get('lang', 'pt-br')
        return obj.get_name(lang)
