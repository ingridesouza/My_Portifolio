from django.urls import path
from .views import SiteSettingsView, TranslationViewSet, MigrateView

urlpatterns = [
    path('settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('translations/', TranslationViewSet.as_view({'get': 'list'}), name='translations'),
    path('migrate/', MigrateView.as_view(), name='migrate'),
]
