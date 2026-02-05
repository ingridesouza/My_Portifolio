from django.db import models


class Profile(models.Model):
    """Developer profile - Singleton"""
    full_name = models.CharField(max_length=100)

    professional_title = models.CharField(max_length=100)
    professional_title_en = models.CharField(max_length=100, blank=True)
    professional_title_fr = models.CharField(max_length=100, blank=True)

    location = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)

    photo = models.ImageField(upload_to='profile/', blank=True)
    photo_alt = models.CharField(max_length=100, default="Profile Photo")

    bio_short = models.TextField(help_text="Short bio for hero section")
    bio_short_en = models.TextField(blank=True)
    bio_short_fr = models.TextField(blank=True)

    bio_full = models.TextField(help_text="Full bio for about section")
    bio_full_en = models.TextField(blank=True)
    bio_full_fr = models.TextField(blank=True)

    resume_pdf = models.FileField(upload_to='documents/', blank=True)

    github_username = models.CharField(max_length=50)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)

    is_available_for_hire = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1, defaults={
            'full_name': 'Ingride Souza',
            'professional_title': 'Desenvolvedora Back-End',
            'location': 'Salvador, Bahia - Brasil',
            'email': 'ingridesouza040@gmail.com',
            'github_username': 'ingridesouza',
            'bio_short': 'Desenvolvedora Back-End',
            'bio_full': 'Desenvolvedora Back-End com experiencia em Python, Django e APIs.',
        })
        return obj

    def __str__(self):
        return self.full_name

    def get_professional_title(self, lang='pt-br'):
        if lang == 'en' and self.professional_title_en:
            return self.professional_title_en
        if lang == 'fr' and self.professional_title_fr:
            return self.professional_title_fr
        return self.professional_title

    def get_bio_short(self, lang='pt-br'):
        if lang == 'en' and self.bio_short_en:
            return self.bio_short_en
        if lang == 'fr' and self.bio_short_fr:
            return self.bio_short_fr
        return self.bio_short

    def get_bio_full(self, lang='pt-br'):
        if lang == 'en' and self.bio_full_en:
            return self.bio_full_en
        if lang == 'fr' and self.bio_full_fr:
            return self.bio_full_fr
        return self.bio_full


class SocialLink(models.Model):
    """Social media links"""
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('instagram', 'Instagram'),
        ('twitter', 'Twitter/X'),
        ('email', 'Email'),
        ('whatsapp', 'WhatsApp'),
        ('telegram', 'Telegram'),
        ('other', 'Other'),
    ]

    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='social_links'
    )
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField()
    icon_class = models.CharField(max_length=50, blank=True, help_text="Font Awesome class")
    display_name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return f"{self.platform}: {self.display_name}"
