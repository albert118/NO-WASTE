"""
Django settings for NO_WASTE project.
Generated by 'django-admin startproject' using Django 3.0.8.
For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import sys
from django.urls import reverse_lazy
from pathlib import Path
import environ
import sys

################################################################################
# Use Twelve-Factor system. Read more: https://12factor.net/
# Allows all credentials to be read from environment variables. Increasing stability
# and security.
################################################################################

env = environ.Env(
    DEBUG=(bool, False)
    )

default_warn = "[ENVIRON SETTINGS] Environment settings not found"
src_dir_root = os.path.dirname(os.path.dirname(os.getcwd()))
env_file = os.path.join(src_dir_root, "local.env")

try:
    environ.Env.read_env(env_file)
except FileNotFoundError:
    print(sys.exit(default_warn))

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
# BASE_DIR is project base (frontend + server), while SITE_ROOT is the server root location 

# standard base dir without local.env
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BASE_DIR = env("BASE_DIR")
SITE_ROOT = os.path.join(BASE_DIR, "server")

################################################################################
# Static & media file configuration (CSS, JavaScript, Images).
# add non-app-specific STATICFILES_DIRS here.
# https://docs.djangoproject.com/en/3.0/howto/static-files/

################################################################################

STATICFILES_DIRS =[
    str(os.path.join(SITE_ROOT, "static")), # site static root
    str(os.path.join(SITE_ROOT, 'bootstrap')), # bootstrap install dir
]

STATIC_URL = "/static/"
STATIC_ROOT = str(os.path.join(BASE_DIR, os.path.join("frontend", os.path.join("public", "static")))) # project static dir -> collectstatic here
# MEDIA_ROOT = str(os.path.join(SITE_ROOT, "media"))
# MEDIA_URL = "/media/"
# PUBLIC_ROOT = str(os.path.join(SITE_ROOT, 'public'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'easy_thumbnails', # auto render thumbnails to correct sizes
    'crispy_forms', # crispy form tags
    'debug_toolbar', # debug toolbar for analysis of webpages loaded by django in debug mode
    'health_macros', # the health macro tracker app, designation "HM"
    'accounts.apps.AccountsConfig', # accounts app for user and admin login management
    'django_extensions',  # extensions for the django manage.py interface
    'corsheaders', # enable CORS header control
    'inventory',  # enable the inventory app
    'elasticsearch-app', # the Elastic Search app implementation by @author Jayden Lee
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # just after django.middleware.security.SecurityMiddleware
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'NO_WASTE.urls'

################################################################################
# Use Django templates using the new Django 1.8 TEMPLATES settings
# see https://docs.djangoproject.com/en/dev/ref/settings/#templates for more info
################################################################################

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            str(os.path.join(SITE_ROOT, "templates"))
            # insert more TEMPLATE_DIRS here
        ],

        # load template folder within app directories
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                # Insert your TEMPLATE_CONTEXT_PROCESSORS here or use this
                # list if you haven't customized them:
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.template.context_processors.debug",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = 'NO_WASTE.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(SITE_ROOT, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

LOGIN_REDIRECT_URL = "/"

LOGIN_URL = "accounts/login"

LOGOUT_URL = "accounts/logout"

THUMBNAIL_EXTENSION = "png"  # Default thumbnail extension.

INTERNAL_IPS = [
    '127.0.0.1',
]


# Cookie, CSRF config and 
CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']
CSRF_COOKIE_SAMESITE = None # THIS SETTING MUST BE SET FOR CORS AUTH OTHERWISE COOKIE ISNT SENT
# CSRF_COOKIE = "X-CSRFToken"
# CORS config
# change to app.example.com in production settings
CORS_ORIGIN_WHITELIST = ['http://localhost:3000']
CORS_ALLOW_CREDENTIALS = True
