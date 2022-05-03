# Proyecto Ingeniería de Software

Administrador y gestor de inventarios de persianas.

Creación, edición y  eliminación de:
  + Marcas
  + Categorías
  + Subcategprías
  + Productos
  + Clientes
  + Administradores

Uso de Postgres y Django para el backend.
Manejo de Imagenes para los Productos.


Instalación:

+ Se necesita crear una base de datos en postgres con los siguientes datos:
  + 'NAME': 'Persianas_db'
  + 'USER': 'Persianas_us'
  + 'PASSWORD': '123456'
  + 'HOST': 'localhost'
  + 'PORT': '5432'

`pip install django==3.2.4`
`pip install psycopg2`
`pip install pillow`

Ejecucción:

`python3 ./proyecto-ingenieria-software-main/AppWeb/persianas/manage.py runserver`
