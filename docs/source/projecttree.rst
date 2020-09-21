.. project tree outline of project for quick reference.

Project Tree (Outline)
======================

Whole Project
-------------

src
├──frontend
│
├──server
│
└──static


server (a.k.a 'site' or 'backend')
----------------------------------

server
│   db.sqlite3
│   manage.py
│
├───bootstrap
│   ├───css
│   │
│   └───js
│
├───NO_WASTE
│   │   asgi.py
│   │   settings.py
│   │   urls.py
│   │   views.py
│   │   wsgi.py
│   │   __init__.py
│   │
│   └───__pycache__
│           settings.cpython-38.pyc
│           urls.cpython-38.pyc
│           views.cpython-38.pyc
│           wsgi.cpython-38.pyc
│           __init__.cpython-38.pyc
│
├───static
│   ├───admin
│   │   ├───css
│   │   │   │   autocomplete.css
│   │   │   │   base.css
│   │   │   │   changelists.css
│   │   │   │   dashboard.css
│   │   │   │   fonts.css
│   │   │   │   forms.css
│   │   │   │   login.css
│   │   │   │   responsive.css
│   │   │   │   responsive_rtl.css
│   │   │   │   rtl.css
│   │   │   │   widgets.css
│   │   │   │
│   │   │   └───vendor
│   │   │       └───select2
│   │   │
│   │   ├───fonts
│   │   ├───img
│   │   │   └───gis
│   │   │
│   │   └───js
│   │       ├───admin
│   │       │       DateTimeShortcuts.js
│   │       │       RelatedObjectLookups.js
│   │       │
│   │       └───vendor
│   │           ├───jquery
│   │           │       jquery.js
│   │           │       jquery.min.js
│   │           │       LICENSE.txt
│   │           │
│   │           ├───select2
│   │           │   │   LICENSE.md
│   │           │   │   select2.full.js
│   │           │   │   select2.full.min.js
│   │           │   │
│   │           │   └───i18n
│   │           │
│   │           └───xregexp
│   │
│   ├───components
│   │       About.js
│   │
│   ├───css
│   │
│   ├───js
│   │
│   ├───media
│   │       default_profile.png
│   │       default_profile.png.30x30_q85_crop.png
│   │
│   └───site
│       ├───css
│       │       home.css
│       │       main.css
│       │       res.css
│       │
│       ├───img
│       │   │   logo.svg
│       │   │   logo_alt.png
│       │   │   logo_alt.svg
│       │   │
│       │   ├───health
│       │   │       1.png
│       │   │       2.png
│       │   │       3.png
│       │   │       4.png
│       │   │       5.png
│       │   │
│       │   ├───pantry
│       │   │       1.png
│       │   │       2.png
│       │   │       3.png
│       │   │       4.png
│       │   │       5.png
│       │   │
│       │   └───recipes
│       │           1.png
│       │           2.png
│       │           3.png
│       │           5.png
│       │           6.png
│       │
│       └───js
│ 
└───templates
    │   about.html
    │   base - Working.html
    │   base.html
    │   home.html
    │
    └───registration
            logged_out.html
            password_change_done.html
            password_change_form.html
            password_reset_complete.html
            password_reset_confirm.html
            password_reset_done.html
            password_reset_form.html


frontend (a.k.a 'REACT + JS' or 'UI' or 'SPA')
----------------------------------------------

frontend
├────node_modules
│
├───public
│   └───index.html
└───src
    │	App.js
    │	index.js
    │	App.css
    └────components
       		base.js
        	DisplayMapClass.js
        	djangoPages.js