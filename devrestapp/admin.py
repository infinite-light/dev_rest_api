from django.contrib import admin
from .models import employees, office, department

admin.site.register(employees)
admin.site.register(office)
admin.site.register(department)
