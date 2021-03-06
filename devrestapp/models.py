from django.db import models

class Department(models.Model):
    deptname=models.CharField(max_length=20)
    def __str__(self):
        return self.deptname

class Office(models.Model):
    office_city=models.CharField(max_length=20)
    def __str__(self):
        return self.office_city

class Employee(models.Model):
    firstname=models.CharField(max_length=20)
    lastname=models.CharField(max_length=20)
    phone_number=models.CharField(max_length=10)
    deptno=models.ForeignKey(Department, default=1, on_delete=models.CASCADE)
    office_city=models.ForeignKey(Office, default=1, on_delete=models.CASCADE)
    email_address=models.EmailField(max_length=30, default="example@gmail.com")
    
    def __str__(self):
        return self.firstname

