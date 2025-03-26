from django.urls import path, include
from rest_framework import routers
from .views import register_user, ServicesViewSet, PrintPhotoViewSet, LaminatingViewSet, \
    BindingViewSet, PrintBWViewSet, PrintColourViewSet

router = routers.DefaultRouter()

router.register(r'services', ServicesViewSet)
router.register(r'printphoto', PrintPhotoViewSet)
router.register(r'laminating', LaminatingViewSet)
router.register(r'binding', BindingViewSet)
router.register(r'printbw', PrintBWViewSet)
router.register(r'printcolour', PrintColourViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('services/', ServicesViewSet.as_view({'get': 'services'}), name='services'),
    path('printphoto/', PrintPhotoViewSet.as_view({'get': 'printphoto'}), name='printphoto'),
    path('laminating/', LaminatingViewSet.as_view({'get': 'laminating'}), name='laminating'),
    path('binding/', BindingViewSet.as_view({'get': 'binding'}), name='binding'),
    path('printbw/', PrintBWViewSet.as_view({'get': 'printbw'}), name='printbw'),
    path('printcolour/', PrintColourViewSet.as_view({'get': 'printcolour'}), name='printcolour'),
    path('register/', register_user, name='register'),
]
