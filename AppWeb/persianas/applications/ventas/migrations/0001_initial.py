# Generated by Django 3.2.8 on 2021-11-22 20:14

import django.contrib.postgres.fields.hstore
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ventas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.IntegerField()),
                ('status', models.IntegerField(choices=[(1, 'Pendiente'), (2, 'Enviado'), (3, 'Entregado'), (4, 'Cancelado')])),
                ('date', models.DateTimeField()),
                ('metadata', django.contrib.postgres.fields.hstore.HStoreField(default=dict)),
                ('total', models.FloatField()),
                ('product', models.ManyToManyField(to='productos.Producto')),
            ],
        ),
        migrations.CreateModel(
            name='Cancelacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.IntegerField()),
                ('admin', models.IntegerField(default=0)),
                ('reason', models.IntegerField(choices=[(0, 'Pedido cancelado por un administrador'), (1, 'Me arrepenti'), (2, 'Encontre uno mejor'), (3, 'otro')])),
                ('reasontext', models.TextField(default='')),
                ('date', models.DateTimeField()),
                ('status', models.IntegerField(choices=[(1, 'Pendiente'), (2, 'Aceptado'), (3, 'Denegado')])),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.ventas')),
            ],
        ),
    ]