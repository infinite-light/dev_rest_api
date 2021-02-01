from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import employeeSerializer
from rest_framework.decorators import api_view
import requests  # for arcgis API 
import json
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render, redirect
# for arc gic map
#from arcgis.gis import GIS
#from arcgis.geocoding import geocode, reverse_geocode
#from arcgis.geometry import Point
#import arcpy

'''
class employeelist(APIView):
    def get(self, request):
        allemployee=Employee.objects.all()
        serializer = employeeSerializer(allemployee, many=True)
        return Response(serializer.data)
    def post(self):
        pass    
'''
@api_view(['GET','POST'])
def employeelist(request):
    '''
    List all code of employee or create a new employee
    '''
    if request.method == 'GET':
        allemployee = Employee.objects.all()
        serializer=employeeSerializer(allemployee, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = employeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def employee_detail(request, id):
    '''
    Retrive, update or delete a employee.
    '''
    try:
        employee = Employee.objects.get(id=id)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method =='GET':
        serializer=employeeSerializer(employee)
        return Response(serializer.data)
    
    elif request.method=='PUT':
        serializer=employeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method =='DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def indexpage(request):     
    if request.method=="POST":
        address_line=request.POST.get('address')
        context={address_line}
        return redirect('devrestapp:address', context)
    else:
        context={}
        return render(request,'devrestapp/index.html', context)

def eindexpage(request):     
        context={}
        return render(request,'devrestapp/eindex.html', context)

def gindexpage(request):     
        context={}
        return render(request,'devrestapp/gindex.html', context)


'''
@api_view(['GET','POST'])
def gicmap(request):
    gis = GIS()
    m = gis.map("Los Angeles, CA", zoomlevel=11)
   # Web_Map_as_JSON = arcpy.GetParameterAsText(m)
    return m
    # return Response(m)

'''
@api_view(['GET','POST'])
def address(request):
    if request.method=="POST":
        address_line=request.POST.get('address')
    #address_line = "489 canterbury cir, Canton, Michigan 48187"
    url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleline=" + address_line + "&outField=Match_addr, Addr_type"
    payload={}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    doc = json.loads(response.text)
    #doc1 ={"spatialReference":doc["spatialReference"]}
    '''
    doc2 ={"location" : doc["candidates"][0]}
    doc3 = {"X": doc["candidates"][0]["location"]["x"],
            "y": doc["candidates"][0]["location"]["y"]  
    }
    #print(doc["candidates"][0]["location"]["x"])
    #print(doc["candidates"][0]["location"]["y"])
    '''
    return Response(data=doc)

    