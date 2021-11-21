from django.db import models

# Create your models here.
class Categoria(models.Model):
	name = models.CharField(max_length=20)

class Subcategoria(models.Model):
	name = models.CharField(max_length=20)
	categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="subcat")