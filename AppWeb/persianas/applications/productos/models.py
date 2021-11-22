from django.db import models

# Create your models here.
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