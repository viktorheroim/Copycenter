from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Services, PrintPhoto,PrintPhotoDocuments, Laminating, Binding, PrintBW, PrintColour, ProductRamki, ProductAlbum, Order, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        if User.objects.filter(username=validated_data['username']).exists():
            raise ValidationError({"username": "Пользователь с таким именем уже существует."})

        if User.objects.filter(email=validated_data['email']).exists():
            raise ValidationError({"email": "Пользователь с таким email уже существует."})

        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        username = validated_data.get('username', instance.username)
        email = validated_data.get('email', instance.email)

        # Проверка на уникальность нового username и email
        if User.objects.filter(username=username).exclude(pk=instance.pk).exists():
            raise ValidationError({"username": "Пользователь с таким именем уже существует."})

        if User.objects.filter(email=email).exclude(pk=instance.pk).exists():
            raise ValidationError({"email": "Пользователь с таким email уже существует."})

        instance.username = username
        instance.email = email

        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        instance.save()
        return instance


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('__all__')


class PrintPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintPhoto
        fields = ('__all__')


class PrintPhotoDocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintPhotoDocuments
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


class ProductAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAlbum
        fields = ('__all__')


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Order
        fields = ('__all__')


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at']
