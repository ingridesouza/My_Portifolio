from django.urls import path
from .views import ProfileView, SocialLinksView

urlpatterns = [
    path('', ProfileView.as_view(), name='profile'),
    path('social-links/', SocialLinksView.as_view(), name='social-links'),
]
