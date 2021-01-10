Requirements
To run this project
first make your virtual environment :python3 -m venv restenv
then activate :source restenv/bin/activate
we have a requuirements.txt if you wish to run 
OR you can 
    install django : pip3 install django
    install restframework : pip3 install djangorestframework
    install restuests : pip3 install requests

Execution 
we have few entry to run the project
   
   path('', views.indexpage, name='index'), 
   the Index page there is just input box to give address and submit botton
   we can see all the spacial referances like x amd Y (longitude and latitude). specific information we can get by setting 'doc' in address function in views.py
   
   path('employees/<int:id>', views.employee_detail),
   path('employees/', views.employeelist),
    if we are just give employee  we can use GET and POST method of the rest API
    and if we will give any specific number of the employee we can use GET, PUT and DELETE methods of the rest API.
   
