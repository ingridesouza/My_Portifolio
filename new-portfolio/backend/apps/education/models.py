from django.db import models


class Education(models.Model):
    """Academic education"""
    DEGREE_TYPES = [
        ('technologist', 'Technologist'),
        ('bachelor', 'Bachelor'),
        ('master', 'Master'),
        ('doctorate', 'Doctorate'),
        ('course', 'Course'),
        ('bootcamp', 'Bootcamp'),
    ]

    institution = models.CharField(max_length=100)
    institution_logo = models.ImageField(upload_to='institutions/', blank=True)
    institution_url = models.URLField(blank=True)

    degree_type = models.CharField(max_length=20, choices=DEGREE_TYPES)

    degree_name = models.CharField(max_length=100)
    degree_name_en = models.CharField(max_length=100, blank=True)
    degree_name_fr = models.CharField(max_length=100, blank=True)

    field_of_study = models.CharField(max_length=100, blank=True)

    description = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_fr = models.TextField(blank=True)

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)

    skills_learned = models.ManyToManyField(
        'skills.Skill',
        related_name='educations',
        blank=True
    )

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-is_current', '-start_date']
        verbose_name = "Education"
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree_name} - {self.institution}"

    def get_degree_name(self, lang='pt-br'):
        if lang == 'en' and self.degree_name_en:
            return self.degree_name_en
        if lang == 'fr' and self.degree_name_fr:
            return self.degree_name_fr
        return self.degree_name

    def get_description(self, lang='pt-br'):
        if lang == 'en' and self.description_en:
            return self.description_en
        if lang == 'fr' and self.description_fr:
            return self.description_fr
        return self.description


class Certification(models.Model):
    """Certifications"""
    name = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    name_fr = models.CharField(max_length=100, blank=True)

    issuing_organization = models.CharField(max_length=100)
    organization_logo = models.ImageField(upload_to='organizations/', blank=True)

    issue_date = models.DateField()
    expiration_date = models.DateField(null=True, blank=True)

    credential_id = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(blank=True)
    certificate_file = models.FileField(upload_to='certificates/', blank=True)

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-issue_date']
        verbose_name = "Certification"
        verbose_name_plural = "Certifications"

    def __str__(self):
        return self.name

    def get_name(self, lang='pt-br'):
        if lang == 'en' and self.name_en:
            return self.name_en
        if lang == 'fr' and self.name_fr:
            return self.name_fr
        return self.name
