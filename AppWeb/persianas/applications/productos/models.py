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