from django.db import models

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