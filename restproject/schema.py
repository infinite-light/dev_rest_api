import graphene
import devrestapp.schema
from devrestapp.schema.departments import schema as department_schema
from devrestapp.schema.offices import schema as office_schema
from devrestapp.schema.employees import schema as employee_schema
# Our Project Level Schema 🚒 🔥
# If we had multiple apps, we'd import them here ✈
# Then, inherit from their Queries and Mutations 👦 
# And, finally return them as one object 💧

class Query(department_schema.Query, office_schema.Query, employee_schema.Query):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass
class Mutation(department_schema.Mutation, office_schema.Mutation, employee_schema.Mutation):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)