from django.db import models
from django.contrib.auth.models import User

class Services(models.Model):
    name_service = models.CharField(max_length=30)

    def __str__(self):
        return f'Наименование услуги: {self.name_service}'


class PrintPhoto(models.Model):
    paper = models.CharField(max_length=20)
    format = models.CharField(max_length=10)
    price = models.FloatField()

    def __str__(self):
        return f'Бумага: {self.paper} | Формат: {self.format} | Цена: {self.price} руб.'


class Laminating(models.Model):
    format = models.CharField(max_length=10)
    price = models.FloatField()

    def __str__(self):
        return f'Формат: {self.format} | Цена: {self.price} руб.'


class Binding(models.Model):
    description = models.CharField(max_length=100)
    price = models.FloatField()

    def __str__(self):
        return f'Описание: {self.description} | Цена: {self.price} руб.'


class PrintBW(models.Model):
    format = models.CharField(max_length=10)
    price = models.FloatField()

    def __str__(self):
        return f'Формат: {self.format} | Цена: {self.price} руб.'


class PrintColour(models.Model):
    format = models.CharField(max_length=10)
    price = models.FloatField()

    def __str__(self):
        return f'Формат: {self.format} | Цена: {self.price} руб.'


class ProductRamki (models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    image_url = models.URLField()

    def str(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    products = models.JSONField()  # Список продуктов в формате JSON
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"