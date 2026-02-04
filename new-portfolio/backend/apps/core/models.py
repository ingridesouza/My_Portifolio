from django.db import models


class SiteSettings(models.Model):
    """Global site settings - Singleton"""
    site_name = models.CharField(max_length=100, default="Ingride Souza")
    meta_description = models.TextField(blank=True)
    meta_keywords = models.CharField(max_length=255, blank=True)
    google_analytics_id = models.CharField(max_length=50, blank=True)
    maintenance_mode = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass  # Prevent deletion

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.site_name


class Translation(models.Model):
    """Static text translations"""
    key = models.CharField(max_length=100, unique=True, db_index=True)
    pt_br = models.TextField()
    pt_pt = models.TextField(blank=True)
    en = models.TextField(blank=True)
    fr = models.TextField(blank=True)

    class Meta:
        verbose_name = "Translation"
        verbose_name_plural = "Translations"
        ordering = ['key']

    def __str__(self):
        return self.key

    def get_translation(self, lang='pt-br'):
        """Get translation for specific language"""
        lang_map = {
            'pt-br': self.pt_br,
            'pt-pt': self.pt_pt or self.pt_br,
            'en': self.en or self.pt_br,
            'fr': self.fr or self.pt_br,
        }
        return lang_map.get(lang.lower(), self.pt_br)
