import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from devrestapp.models import Department, Office, Employee
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from graphene import Argument

from time import time as timer

class employeeType(DjangoObjectType):
    class Meta:
        model = Employee
        fields = ("id","firstname","lastname","contactno","deptno","office_city", "empemail")

class Query(graphene.ObjectType):
    all_employee = graphene.List(employeeType)
    employee = graphene.Field(employeeType, id=graphene.Int() )
    employeeofcontactno= graphene.Field(employeeType, contactno=graphene.String())
    
    def resolve_all_employee(self, info, **kwargs):
        return Employee.objects.all()
        
    def resolve_employee(self, info, id):
        #print(info.context.META['HTTP_X_VERSION_NUMBER'])
        return Employee.objects.get(pk=id)

    def resolve_employeeofcontactno(self,info,contactno):
        return Employee.objects.get(contactno=contactno)


class CreateEmployee(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation
    firstname=graphene.String()
    lastname=graphene.String()
    contactno=graphene.String()
    deptno_id=graphene.Int()
    office_city_id = graphene.Int()
    empemail=graphene.String()

  employee = graphene.Field(employeeType)

  def mutate(self, info, firstname, lastname, contactno, deptno_id, office_city_id, empemail):
    employee = Employee.objects.create(
        firstname=firstname,
        lastname=lastname,
        contactno=contactno,
        deptno_id=deptno_id,
        office_city_id=office_city_id,
        empemail=empemail
    )
    employee.save()
    # We've done this so many times, it no longer feels weird 😃 
    return CreateEmployee( employee=employee )

class UpdateEmployee(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation 
    id=graphene.ID()
    firstname=graphene.String()
    lastname=graphene.String()
    contactno=graphene.String()
    deptno_id=graphene.Int()
    office_city_id = graphene.Int()
    empemail=graphene.String()

  # The class attributes define the response of the mutation
  employee = graphene.Field(employeeType)
  
  def mutate(self, info, id, firstname, lastname, contactno, deptno_id, office_city_id, empemail):
      
    employee = Employee.objects.get(pk=id)
    employee.firstname = firstname if firstname is not None else employee.firstname
    employee.lastname = lastname if lastname is not None else employee.lastname
    employee.contactno = contactno if contactno is not None else employee.contactno
    employee.deptno_id = deptno_id if deptno_id is not None else employee.deptno_id
    employee.office_city_id = office_city_id if office_city_id is not None else employee.office_city_id
    employee.empemail=empemail if empemail is not None else employee.empemail
    employee.save()
    # Notice we return an instance of this mutation 🤷‍♀️
    return UpdateEmployee(employee=employee)


class DeleteEmployee(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation
    id = graphene.ID()

  # The class attributes define the response of the mutation
  employee = graphene.Field(employeeType)

  def mutate(self, info, id):
    employee = Employee.objects.get(pk=id)
    if employee is not None:
      # Notice we don't do department.delete()? Thats because we must not 😓
      employee.delete()
    # Notice we return an instance of this mutation 🤷‍♀️
    return DeleteEmployee(employee=employee)

class Mutation(graphene.ObjectType):
  Create_employee = CreateEmployee.Field()
  Update_employee = UpdateEmployee.Field()
  Delete_employee = DeleteEmployee.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)



