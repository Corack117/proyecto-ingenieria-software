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
class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="profile_pictures")
    verificado = models.IntegerField(default = 0)
    # 0 sin verificar, 1 verificado, 2 rechazado
    location = HStoreField(default=dict)
    activo = models.BooleanField(default=True)