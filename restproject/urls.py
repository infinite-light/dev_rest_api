"""restproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

import sys
from os.path import dirname
sys.path.append('../devrestapp/')

from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from devrestapp import views
from graphene_django.views import GraphQLView
from .schema import schema 
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
   path('admin/', admin.site.urls),
   # path('', views.employeelist.as_view()),
   path('employees/<int:id>', views.employee_detail),
   path('employees/', views.employeelist),
   path('address/', views.address, name="address"),
   #path('map/', views.gicmap, name="gicmap"),
   #path('', views.indexpage, name='index'),
   path('', views.eindexpage, name='eindex'),
   path('g/', views.gindexpage, name='gindex'),
   path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
]