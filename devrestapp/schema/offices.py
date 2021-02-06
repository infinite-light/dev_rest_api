import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from ..models import Department, Office, Employee
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from graphene import Argument

from time import time as timer

class officeType(DjangoObjectType):
    class Meta:
        model = Office
#        fields = ("id","office_city")

class Query(graphene.ObjectType):
    all_office = graphene.List(officeType)
    office=graphene.Field(officeType, id=graphene.ID())

    def resolve_all_office(self, info, **kwargs):
        return Office.objects.all()
        
    def resolve_office(self, info, id):
        return Office.objects.filter(id=id)


#******************* 😎 OFFICE-MUTATIONS 😎 *************************#
class CreateOffice(graphene.Mutation):
  class Arguments:
    # The input arguments for this mutation
    office_city = graphene.String()

  office = graphene.Field(officeType)

  def mutate(self, info, office_city):
    office = Office.objects.create(office_city = office_city  )
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
    office = Office.objects.get(pk=id)
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
    office = Office.objects.get(pk=id)
    if office is not None:
      # Notice we don't do department.delete()? Thats because we must not 😓
      office.delete()
    # Notice we return an instance of this mutation 🤷‍♀️
    return DeleteOffice(office=office)


class Mutation(graphene.ObjectType):
  Create_office = CreateOffice.Field()
  Update_office = UpdateOffice.Field()
  Delete_office = DeleteOffice.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)


