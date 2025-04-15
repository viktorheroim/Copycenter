from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Services, PrintPhoto, Laminating, Binding, PrintBW, PrintColour, ProductRamki, Order


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('__all__')

class PrintPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintPhoto
        fields = ('__all__')

class LaminatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laminating
        fields = ('__all__')

class BindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Binding
        fields = ('__all__')

class PrintBWSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintBW
        fields = ('__all__')

class PrintColourSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintColour
        fields = ('__all__')

class ProductRamkiSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRamki
        fields = ('__all__')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'name', 'address', 'phone', 'products']