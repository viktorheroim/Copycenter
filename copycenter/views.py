from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django_filters import views
from rest_framework import filters, permissions, generics
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Services, PrintPhoto, Laminating, Binding, PrintBW, PrintColour, ProductRamki, Order, Comment
from .permissions import AllForAdminOtherReadOnly
from .serializers import UserSerializer, ServicesSerializer, PrintPhotoSerializer, LaminatingSerializer, \
    BindingSerializer, PrintBWSerializer, PrintColourSerializer, ProductRamkiSerializer, OrderSerializer, \
    CommentSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()  # Удаляем токен пользователя
        return Response(status=204)  # Возвращаем статус 204 No ContentService


class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
    permission_classes = (AllForAdminOtherReadOnly,)
    filter_backends = [filters.SearchFilter]
    search_fields = ['name_service']

    def services(self, request, *args, **kwargs):
        return Response(status=status.HTTP_200_OK)

class PrintPhotoViewSet(viewsets.ModelViewSet):
    queryset = PrintPhoto.objects.all()
    serializer_class = PrintPhotoSerializer
    permission_classes = (AllForAdminOtherReadOnly,)
    filter_backends = [filters.SearchFilter]
    search_fields = ['paper', 'format']

    def printphoto(self, request, *args, **kwargs):
        return Response(status=status.HTTP_200_OK)


class LaminatingViewSet(viewsets.ModelViewSet):
    queryset = Laminating.objects.all()
    serializer_class = LaminatingSerializer
    permission_classes = (AllForAdminOtherReadOnly,)
    filter_backends = [filters.SearchFilter]
    search_fields = ['format']

    def laminating(self, request, *args, **kwargs):
        return Response(status=status.HTTP_200_OK)


class BindingViewSet(viewsets.ModelViewSet):
    queryset = Binding.objects.all()
    serializer_class = BindingSerializer
    permission_classes = (AllForAdminOtherReadOnly,)

    def binding(self, request, *args, **kwargs):
        return Response(status=status.HTTP_200_OK)


class PrintBWViewSet(viewsets.ModelViewSet):
    queryset = PrintBW.objects.all()
    serializer_class = PrintBWSerializer
    permission_classes = (AllForAdminOtherReadOnly,)

    def printBW(self, request, *args, **kwargs):
        return Response(status=status.HTTP_200_OK)


class PrintColourViewSet(viewsets.ModelViewSet):
    queryset = PrintColour.objects.all()
    serializer_class = PrintColourSerializer
    permission_classes = (AllForAdminOtherReadOnly,)

    def printColour(self, request, *args, **kwargs):
        return Response(status=status.HTTP_200_OK)


class ProductRamkiViewSet(viewsets.ModelViewSet):
    queryset = ProductRamki.objects.all()
    serializer_class = ProductRamkiSerializer
    permission_classes = (AllForAdminOtherReadOnly,)

    def productRamki(self, request, *args, **kwargs):
        return Response(status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


