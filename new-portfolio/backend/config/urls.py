"""
URL configuration for portfolio project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # API v1
    path('api/v1/', include([
        path('', include('apps.core.urls')),
        path('profile/', include('apps.profile.urls')),
        path('skills/', include('apps.skills.urls')),
        path('projects/', include('apps.projects.urls')),
        path('experience/', include('apps.experience.urls')),
        path('education/', include('apps.education.urls')),
        path('github/', include('apps.github_integration.urls')),
    ])),
]

# Debug toolbar
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

    # Serve media files in development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Admin customization
admin.site.site_header = 'Portfolio Admin'
admin.site.site_title = 'Ingride Souza Portfolio'
admin.site.index_title = 'Gerenciamento do Portfolio'
