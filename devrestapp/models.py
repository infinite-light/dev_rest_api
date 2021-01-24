from django.db import models

class department(models.Model):
    deptname=models.CharField(max_length=20)
    def __str__(self):
        return self.deptname

class office(models.Model):
    office_city=models.CharField(max_length=20)
    def __str__(self):
        return self.office_city

class employees(models.Model):
    firstname=models.CharField(max_length=20)
    lastname=models.CharField(max_length=20)
    contactno=models.IntegerField()
    deptno=models.ForeignKey(department, default=1, on_delete=models.CASCADE)
    office_city=models.ForeignKey(office, default=1, on_delete=models.CASCADE)
    def __str__(self):
        return self.firstname

