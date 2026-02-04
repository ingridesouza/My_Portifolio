from django.db import models


class SkillCategory(models.Model):
    """Skill categories"""
    CATEGORY_TYPES = [
        ('hard', 'Hard Skills'),
        ('soft', 'Soft Skills'),
        ('tools', 'Tools'),
        ('certifications', 'Certifications'),
    ]

    name = models.CharField(max_length=50)
    name_en = models.CharField(max_length=50, blank=True)
    name_fr = models.CharField(max_length=50, blank=True)

    type = models.CharField(max_length=20, choices=CATEGORY_TYPES)
    icon_class = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Skill Category"
        verbose_name_plural = "Skill Categories"
        ordering = ['order']

    def __str__(self):
        return self.name

    def get_name(self, lang='pt-br'):
        if lang == 'en' and self.name_en:
            return self.name_en
        if lang == 'fr' and self.name_fr:
            return self.name_fr
        return self.name


class Skill(models.Model):
    """Individual skills"""
    category = models.ForeignKey(
        SkillCategory,
        on_delete=models.CASCADE,
        related_name='skills'
    )

    name = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    name_fr = models.CharField(max_length=100, blank=True)

    description = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_fr = models.TextField(blank=True)

    proficiency = models.PositiveIntegerField(
        default=0,
        help_text="Proficiency level 0-100"
    )
    icon_class = models.CharField(max_length=50, blank=True)
    icon_svg = models.TextField(blank=True, help_text="SVG code for tech logos")
    color = models.CharField(max_length=7, blank=True, help_text="Hex color")

    years_experience = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        null=True,
        blank=True
    )

    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-is_featured', 'order']
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.name

    def get_name(self, lang='pt-br'):
        if lang == 'en' and self.name_en:
            return self.name_en
        if lang == 'fr' and self.name_fr:
            return self.name_fr
        return self.name

    def get_description(self, lang='pt-br'):
        if lang == 'en' and self.description_en:
            return self.description_en
        if lang == 'fr' and self.description_fr:
            return self.description_fr
        return self.description
