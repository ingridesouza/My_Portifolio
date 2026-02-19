from django.urls import path
from .views import SiteSettingsView, TranslationViewSet, SetupView

urlpatterns = [
    path('settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('translations/', TranslationViewSet.as_view({'get': 'list'}), name='translations'),
    path('setup/', SetupView.as_view(), name='setup'),
]
