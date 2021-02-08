import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from devrestapp.models import Department, Office, Employee
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from graphene import Argument
from django.shortcuts import get_object_or_404
from time import time as timer


class employeeType(DjangoObjectType):
    class Meta:
        model = Employee
        fields = ("id", "firstname", "lastname", "phone_number",
                  "deptno", "office_city", "email_address")


class Query(graphene.ObjectType):
    all_employee = graphene.List(employeeType)
    employee = graphene.Field(employeeType, id=graphene.Int())
    employeeofphone_number = graphene.Field(
        employeeType, phone_number=graphene.String())

    def resolve_all_employee(self, info, **kwargs):
        return Employee.objects.all()

    def resolve_employee(self, info, id):
        # print(info.context.META['HTTP_X_VERSION_NUMBER'])
        return Employee.objects.get(pk=id)

    def resolve_employeeofphone_number(self, info, phone_number):
        return Employee.objects.get(phone_number=phone_number)


class CreateEmployee(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        firstname = graphene.String()
        lastname = graphene.String()
        phone_number = graphene.String()
        deptno_id = graphene.Int()
        office_city_id = graphene.Int()
        email_address = graphene.String()

    employee = graphene.Field(employeeType)
    OK = graphene.String()

    @staticmethod
    def mutate(self, info, firstname, lastname, phone_number, deptno_id, office_city_id, email_address):
        if (employee_exists(id, phone_number, email_address)):
            employee = Employee.objects.create(
                firstname=firstname,
                lastname=lastname,
                phone_number=phone_number,
                deptno_id=deptno_id,
                office_city_id=office_city_id,
                email_address=email_address
            )
            employee.save()

            return CreateEmployee(employee=employee, OK="Employee Saved.")
        else:
            return UpdateEmployee(employee=None, OK="Phone Number and EmailCombination is exist.")


def employee_exists(id, phone_number, email):
    #selectedEmployee = get_object_or_404(Employee, phone_number=contact_no)
    try:
        selectedEmployee = Employee.objects.get(phone_number=phone_number)

        if (str(selectedEmployee.id) != id and selectedEmployee.email_address == email):
            return False

        return True
    except Employee.DoesNotExist:
        return True
    except Employee.MultipleObjectsReturned:
        return False


class UpdateEmployee(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        firstname = graphene.String()
        lastname = graphene.String()
        phone_number = graphene.String()
        deptno_id = graphene.Int()
        office_city_id = graphene.Int()
        email_address = graphene.String()

    # The class attributes define the response of the mutation
    employee = graphene.Field(employeeType)
    OK = graphene.String()

    @staticmethod
    def mutate(self, info, id, firstname, lastname, phone_number, deptno_id, office_city_id, email_address):
        if (info.context.META['HTTP_X_VERSION_NUMBER'] == '1.3'):
            if (employee_exists(id, phone_number, email_address)):
                employee = Employee.objects.get(pk=id)
                employee.firstname = firstname if firstname is not None else employee.firstname
                employee.lastname = lastname if lastname is not None else employee.lastname
                employee.phone_number = phone_number if phone_number is not None else employee.phone_number
                employee.deptno_id = deptno_id if deptno_id is not None else employee.deptno_id
                employee.office_city_id = office_city_id if office_city_id is not None else employee.office_city_id
                employee.email_address = email_address if email_address is not None else employee.email_address
                employee.save()
            # Notice we return an instance of this mutation 🤷‍♀️
                print("Record has been updated to version 1.3")
                return UpdateEmployee(employee=employee, OK="Employee Updated to version 1.3")
            else:
                return UpdateEmployee(employee=None, OK="Phone Number and EmailCombination is exist v1.3")
        else:
            email_address="oldversion@gmail.com"
            if (employee_exists(id, phone_number, email_address)):
                employee = Employee.objects.get(pk=id)
                employee.firstname = firstname if firstname is not None else employee.firstname
                employee.lastname = lastname if lastname is not None else employee.lastname
                employee.phone_number = phone_number if phone_number is not None else employee.phone_number
                employee.deptno_id = deptno_id if deptno_id is not None else employee.deptno_id
                employee.office_city_id = office_city_id if office_city_id is not None else employee.office_city_id
                employee.email_address = email_address if email_address is not None else employee.email_address
                employee.save()
            # Notice we return an instance of this mutation 🤷‍♀️
                print("Record has been updated to version 1.2")
                return UpdateEmployee(employee=employee, OK="Employee Updated to version 1.2")
            else:
                return UpdateEmployee(employee=None, OK="Phone Number and EmailCombination is exist.")


class DeleteEmployee(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()

    # The class attributes define the response of the mutation
    employee = graphene.Field(employeeType)
    OK = graphene.String()

    @staticmethod
    def mutate(self, info, id):
        employee = Employee.objects.get(pk=id)
        if employee is not None:

            employee.delete()
        # Notice we return an instance of this mutation 🤷‍♀️
        return DeleteEmployee(employee=employee, OK="Employee Deleted")


class Mutation(graphene.ObjectType):
    Create_employee = CreateEmployee.Field()
    Update_employee = UpdateEmployee.Field()
    Delete_employee = DeleteEmployee.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
