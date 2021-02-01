import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from .models import Department, Office, Employee
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from graphene import Argument

from time import time as timer

class departmentType(DjangoObjectType):
    class Meta:
        model = Department
        fields = ("id","deptname")

class officeType(DjangoObjectType):
    class Meta:
        model = Office
#        fields = ("id","office_city")

class employeeType(DjangoObjectType):
    class Meta:
        model = Employee
        fields = ("id","firstname","lastname","contactno","deptno","office_city", "empemail")

class employee2Type(DjangoObjectType):
    class Meta:
        model = Employee
      #  fields = ("id","firstname","lastname","contactno", "deptno","office_city","empemail")

class Query(graphene.ObjectType):
    all_employee = graphene.List(employeeType)
    employee = graphene.Field(employeeType, id=graphene.Int() )
    #all_employee = graphene.Field(employee2Type, id=graphene.Int())
    all_office = graphene.List(officeType, id=graphene.Int())
    office=graphene.Field(officeType, id=graphene.ID())
    all_department = graphene.List(departmentType, id=graphene.Int())
    department=graphene.Field(departmentType, id=graphene.ID())
    
    def resolve_all_employee(root,info):
        return Employee.objects.all()
        
    def resolve_employee(root, info, id):
        #print(info.context.META['HTTP_X_VERSION_NUMBER'])
        return Employee.objects.get(pk=id)

    def resolve_all_office(root,info):
        return Office.objects.all()
        
    def resolve_office(root, info, id):
        return Office.objects.filter(id=id)

    def resolve_all_department(root, info, id):
        return Department.objects.all()
    
    def resolve_department(root, info, id):
        return Department.objects.filter(id=id)

#******************* 😎 DEPARTMENT-MUTATIONS 😎 *************************#
class CreateDepartment(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation
    deptname = graphene.String()

  department = graphene.Field(departmentType)

  def mutate(self, info, deptname):
    department = Department.objects.create( deptname = deptname  )
    # We've done this so many times, it no longer feels weird 😃 
    return CreateDepartment( department=department )


class UpdateDepartment(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation 
    id = graphene.ID()
    deptname = graphene.String()

  # The class attributes define the response of the mutation
  department = graphene.Field(departmentType)

  def mutate(self, info, id, deptname):
    department = department.objects.get(pk=id)
    department.deptname = deptname if deptname is not None else department.deptname
    department.save()
    # Notice we return an instance of this mutation 🤷‍♀️
    return UpdateDepartment(department=department)


class DeleteDepartment(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation
    id = graphene.ID()

  # The class attributes define the response of the mutation
  department = graphene.Field(departmentType)

  def mutate(self, info, id):
    department = department.objects.get(pk=id)
    if department is not None:
      # Notice we don't do department.delete()? Thats because we must not 😓
      department.delete()
    # Notice we return an instance of this mutation 🤷‍♀️
    return DeleteDepartment(department=department)


#******************* 😎 OFFICE-MUTATIONS 😎 *************************#
class CreateOffice(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation
    office_city = graphene.String()

  office = graphene.Field(officeType)

  def mutate(self, info, office_city):
    office = office.objects.create(office_city = office_city  )
    # We've done this so many times, it no longer feels weird 😃 
    return CreateOffice( office=office )


class UpdateOffice(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation 
    id = graphene.ID()
    office_city = graphene.String()

  # The class attributes define the response of the mutation
  office = graphene.Field(officeType)

  def mutate(self, info, id, office_city):
    office = office.objects.get(pk=id)
    office.office_city = office_city if office_city is not None else office.office_city
    office.save()
    # Notice we return an instance of this mutation 🤷‍♀️
    return UpdateOffice(office=office)


class DeleteOffice(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation
    id = graphene.ID()

  # The class attributes define the response of the mutation
  office = graphene.Field(officeType)

  def mutate(self, info, id):
    office = office.objects.get(pk=id)
    if office is not None:
      # Notice we don't do department.delete()? Thats because we must not 😓
      office.delete()
    # Notice we return an instance of this mutation 🤷‍♀️
    return DeleteOffice(office=office)

#******************* 😎 EMPLOYEE-MUTATIONS 😎 *************************#
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

  Create_department = CreateDepartment.Field()
  Dpdate_department = UpdateDepartment.Field()
  Delete_department = DeleteDepartment.Field()

  Create_office = CreateOffice.Field()
  Update_office = UpdateOffice.Field()
  Delete_office = DeleteOffice.Field()




