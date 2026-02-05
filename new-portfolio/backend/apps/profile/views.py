from rest_framework import views
from rest_framework.response import Response
from .models import Profile, SocialLink
from .serializers import ProfileSerializer, SocialLinkSerializer


class ProfileView(views.APIView):
    """Get profile data"""

    def get(self, request):
        profile = Profile.load()
        lang = request.query_params.get('lang', 'pt-br')
        serializer = ProfileSerializer(profile, context={'lang': lang})
        return Response(serializer.data)


class SocialLinksView(views.APIView):
    """Get social links"""

    def get(self, request):
        links = SocialLink.objects.filter(is_active=True)
        serializer = SocialLinkSerializer(links, many=True)
        return Response(serializer.data)
