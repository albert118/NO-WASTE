# django-skeleton

**A django project skeleton for easy setup on a LAMP server! Under development...**

## Some of the features currently built-in:

* Ready project skeleton for development.
* Logging/Debugging custom implemented.
* For Python 3.+
* Based on Django 1.8 project structure.
* Better Security with [12-Factor](http://12factor.net/) recommendations.
* Ready for a MySQL database!

## Setup:
This uses [Django's](https://docs.djangoproject.com/en/2.1/ref/django-admin/) admin startproject function to fetch the code from this Git:
Note: by default the --template argument expects .py file types, use the --extension argument to also add README, html code and so forth to your project. Remove these if you don't want the README in your code (ideally you would though for completeness). 

1. `django-admin startproject --template=https://github.com/albert118/django-skeleton/archive/master.zip --extension=py,md,html,env my_proj` *Change `my_proj` to whatever name you want!* This will also change the relevant documentation and variable names within the settings files.
2. `cd my_proj` Then, copy the sample.local.env file (call it local.env) ` cp my_proj/settings/local.sample.env my_proj/settings/local.env`. If you have any issues, just delete and go back to the sample one. 
3. Setup a [MySQL server](http://www.ntu.edu.sg/home/ehchua/programming/sql/MySQL_HowTo.html#intro), see number 3. If you're new to MySQL or need a refresher then read the bits before.
4. Setup a user for Django to use when making migrations. Consider at this point whether there will be a remote or a local access to the database. *Make sure a client is running before doing this!*
`mysql -u root -p     //Windows`
`./mysql -u root -p   //Mac OS X`
Create a new user called "djangoadmin", which can login from localhost (or your IP, or add a wildcard (%) for any - although this is less secure!), with password "your_password":
`mysql> create user 'djangoadmin'@'localhost' identified by 'your_password';`
5. Now give your djangoadmin account permissions. Django will need at least `CREATE, DELETE, INSERT, SELECT, UPDATE.`
DROP is also reccomended if you plan on **ever** squashing your migrations (i.e. it's advised to avoid a headache later!). 
`mysql> grant CREATE, DELETE, INSERT, SELECT, UPDATE, DROP on *.* to 'djangoadmin'@'localhost';` Check that the user has been added.
`mysql> SELECT host, user FROM mysql.user;`
`mysql> quit`
6. Then edit your local.env file with the appropriate settings for your database (login details, source port, etc...). MySQL runs default on port 3306. Check your server's ip with ip addrr (unix esque) or ipconfig (Windows).
7. Now cd back over to your project directory, so you can use manage.py: `python manage.py migrate` to create your initial migrations.
8. Now add all of your code & you're good to go!

## Detailed instructions:
Take a look at the docs for more information.
Also checkout:
[Python](https://www.python.org/)
[Django](https://www.djangoproject.com/)

## Acknowledgements:

This project currently borrows heavily from the [Edge project](https://github.com/arocks/edge). Partially for the structure, but also for the logging and settings configuration.
