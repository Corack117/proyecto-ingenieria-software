from django.db import models, migrations
from django.contrib.postgres.fields import HStoreField
from django.contrib.postgres.operations import HStoreExtension, UnaccentExtension
from django.contrib.auth.models import User

class Migration(migrations.Migration):
	operations = [
		HStoreExtension(),
		UnaccentExtension(),
	]
    
# Create your models here.
class Marca(models.Model):
	name = models.CharField(max_length=20)

class Categoria(models.Model):
	name = models.CharField(max_length=20)

class Subcategoria(models.Model):
	name = models.CharField(max_length=20)
	categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="subcat")
	
class Producto(models.Model):
	name = models.CharField(max_length=50)
	description = models.TextField(null=True, blank=True)
	presentation = models.CharField(max_length=20)
	sku = models.CharField(max_length=5)
	subcategoria = models.ManyToManyField(Subcategoria)
	price = models.FloatField(null=False, blank=False)
	coverPhoto = models.ImageField(upload_to="productos/cover", null=True, blank=True)
	marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
	status = models.BooleanField(null=False, blank=False)
	hasDiscount = models.BooleanField(null=False, blank=False)
	hasPromo = models.BooleanField(null=False, blank=False)
	discount = models.FloatField(null=False, blank=False, default=0)
	inventory = models.IntegerField(null=False, blank=False)
	
class PostImages(models.Model):
	producto  = models.ForeignKey(Producto, on_delete=models.CASCADE)
	image = models.ImageField(upload_to="productos/gallery", null=True, blank=True)
