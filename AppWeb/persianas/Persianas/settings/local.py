from pathlib import Path
from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.postgres',
	# para el live
	'livereload',
	# fin del live
	'django.contrib.staticfiles',
	'applications.productos',
	'applications.usuarios',
	'applications.ventas',
	'applications.principal',
]

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
	# para el live
	'livereload.middleware.LiveReloadScript',
	# fin del live
]

# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql',
		'NAME': 'Persianas_db',
		'USER': 'Persianas_us',
		'PASSWORD': '123456',
		'HOST': 'localhost',
		'PORT': '5432'
	}
}