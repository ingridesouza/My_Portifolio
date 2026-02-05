from django.db import models


class Experience(models.Model):
    """Professional experiences"""
    company_name = models.CharField(max_length=100)
    company_logo = models.ImageField(upload_to='companies/', blank=True)
    company_url = models.URLField(blank=True)

    position = models.CharField(max_length=100)
    position_en = models.CharField(max_length=100, blank=True)
    position_fr = models.CharField(max_length=100, blank=True)

    location = models.CharField(max_length=100, blank=True)
    employment_type = models.CharField(max_length=50, blank=True)

    description = models.TextField()
    description_en = models.TextField(blank=True)
    description_fr = models.TextField(blank=True)

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)

    technologies = models.ManyToManyField(
        'skills.Skill',
        related_name='experiences',
        blank=True
    )

    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-is_current', '-start_date']
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"

    def __str__(self):
        return f"{self.position} at {self.company_name}"

    def get_position(self, lang='pt-br'):
        if lang == 'en' and self.position_en:
            return self.position_en
        if lang == 'fr' and self.position_fr:
            return self.position_fr
        return self.position

    def get_description(self, lang='pt-br'):
        if lang == 'en' and self.description_en:
            return self.description_en
        if lang == 'fr' and self.description_fr:
            return self.description_fr
        return self.description


class ExperienceHighlight(models.Model):
    """Experience highlights/achievements"""
    experience = models.ForeignKey(
        Experience,
        on_delete=models.CASCADE,
        related_name='highlights'
    )

    description = models.TextField()
    description_en = models.TextField(blank=True)
    description_fr = models.TextField(blank=True)

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Experience Highlight"
        verbose_name_plural = "Experience Highlights"

    def __str__(self):
        return self.description[:50]

    def get_description(self, lang='pt-br'):
        if lang == 'en' and self.description_en:
            return self.description_en
        if lang == 'fr' and self.description_fr:
            return self.description_fr
        return self.description
