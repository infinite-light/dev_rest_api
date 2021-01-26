import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from .models import department, office, employees
from django.views.decorators.csrf import csrf_exempt, csrf_protect


class departmentType(DjangoObjectType):
    class Meta:
        model = department
        fields = ("id","deptname")

class officeType(DjangoObjectType):
    class Meta:
        model = office
        fields = ("id","office_city")

class employeesType(DjangoObjectType):
    class Meta:
        model = employees
        fields = ("id","firstname","lastname","contactno","deptno","office_city")

class Query(graphene.ObjectType):
    employee_list = graphene.List(employeesType, id=graphene.Int())
    all_employees = graphene.Field(employeesType, id=graphene.Int())
    all_office = graphene.List(officeType, id=graphene.Int())
    all_department = graphene.List(departmentType, id=graphene.Int())
    
    def resolve_employee_list(root,info):
        return employees.objects.all()
        
    def resolve_all_employees(root, info, id):
        return employees.objects.get(pk=id)

    def resolve_all_office(root, info, id):
        return office.objects.filter(id=id)

    def resolve_all_department(root, info, id):
        return department.objects.filter(id=id)
    

schema = graphene.Schema(query=Query)


