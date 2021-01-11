# Rest API
---
This project was made to learn Rest API basics. This web app provides how to get the spacial referances like x amd Y (longitude and latitude) and learn how to use GET, PUT, POST and DELETE method in Rest API 

## Features
---

- The app is using arcgic API for spacial referances.
  
## Requirements
---
This was developed on Linux but should carry over to other operating systems.

- A Database instance: sqlite is OK
- Framework: Django Rest Framework  
  
### Build Instructions
1. Create virtual env: `python3 -m venv restenv`
2. Activative virtual env: `source restenv/bin/activate`
3. Install dependencies: `pip3 install -r requirements.txt`
4. Modify `DATABASES` in `settings.py` as needed
5. Make Migrations: `python3 manage.py makemigrations`
6. Migrate: `python3 manage.py migrate`
7. Create Super-User: `python3 manage.py createsuperuser`
8. install restframework: `pip3 install djangorestframework`
9. install restuests : `pip3 install requests`


##Execution 
  - Index page there is just input box to give address and submit botton the out output: can get all the spacial referances like x amd Y (longitude and latitude) for that address. more specific information we can set in setting 'doc' object in address function in `views.py`
  - `employees/` We can use GET and POST methods of Rest API and get all the data from employee model
  - `employees/<int:id>` We can GET the data for that particular employee. and use PUT, DELETE method of Rest API  
   
