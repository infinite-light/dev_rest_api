import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from ..models import Department, Office, Employee
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from graphene import Argument

from time import time as timer

class departmentType(DjangoObjectType):
    class Meta:
        model = Department
        fields = ("id","deptname")

class Query(graphene.ObjectType):
    all_department = graphene.List(departmentType)
    department=graphene.Field(departmentType, id=graphene.ID())
    

    def resolve_all_department(root, info):
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
    department.save()
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
    department = Department.objects.get(pk=id)
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



class Mutation(graphene.ObjectType):
  Create_department = CreateDepartment.Field()
  Update_department = UpdateDepartment.Field()
  Delete_department = DeleteDepartment.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)



