from django.test import TestCase
from django.contrib.auth.models import name, title, purchase_date, added_date,total_cost, purchase_icc, num_items
from django.db.models import Count

# for testing the API itself
from rest_framework.test import APITestCase
from rest_framework.views import status
from django.urls import reverse

#Assuming a user has already been created 


#Test the Inventory model  
class modelsTest(TestCase): 
    def testAuthorModel(Self): 
    # We should start with no authors
    self.assertEquals( 
        name.objetcs.count(), 
        0
    )
    #Create a test Author  
    #Create a demo recipe  
    Author_name = name.objects.create_user(name = "test Author Name")
    name.objects.create(username = "Test user 2")#add in other username critera 

#Test that the users were created and saved 
#Test that the users new inventory item was created and saved  



#Test Recipe model  
#Test Item model  
#Test Inventory Model 

