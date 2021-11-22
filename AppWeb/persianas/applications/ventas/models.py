from django.db import models ,migrations
from django.contrib.postgres.fields import HStoreField
from django.contrib.postgres.operations import HStoreExtension, UnaccentExtension
from django.db.models.deletion import CASCADE
from applications.productos.models import *

class Migration(migrations.Migration):
    operations = [
        HStoreExtension(),
        UnaccentExtension(),
    ]

# Create your models here.

class Ventas(models.Model):
    PENDIENTE=1
    ENVIADO=2
    ENTREGADO=3
    CANCELADO=4
    statusChoice=[
        (PENDIENTE,"Pendiente"),
        (ENVIADO,"Enviado"),
        (ENTREGADO,"Entregado"),
        (CANCELADO,"Cancelado"),
    ]
    product = models.ManyToManyField(Producto)
    user = models.IntegerField() #foreingkey usuarios
    status = models.IntegerField(choices=statusChoice)
    date = models.DateTimeField() 
    metadata = HStoreField(default=dict)
    total = models.FloatField()  


class Cancelacion(models.Model):
    ADMINCANCEL = 0
    ARREPENTIR = 1
    UNOMEJOR = 2
    OTRO = 3
    reasonChoice = [
        (ADMINCANCEL, "Pedido cancelado por un administrador"),
        (ARREPENTIR, "Me arrepenti"),
        (UNOMEJOR, "Encontre uno mejor"),
        (OTRO, "otro"),
    ]
    PENDIENTE = 1
    ACEPTADO = 2
    DENEGADO = 3
    statusChoice = [
        (PENDIENTE, "Pendiente"),
        (ACEPTADO, "Aceptado"),
        (DENEGADO, "Denegado"),
    ]
    venta = models.ForeignKey(Ventas,on_delete=CASCADE)   
    user = models.IntegerField()  # foreingkey usuarios
    admin = models.IntegerField(default=0)  # foreingkey usuarios
    reason = models.IntegerField(choices=reasonChoice)
    reasontext = models.TextField(default='')
    date = models.DateTimeField()
    status = models.IntegerField(choices=statusChoice)
