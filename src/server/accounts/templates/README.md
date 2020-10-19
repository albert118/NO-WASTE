Author: Albert Ferguson
Date: 22/09/2020

most of this basic app is sourced from this https://dev.to/stuartelimu/create-an-authentication-app-for-almost-any-django-project-9kc
article and it's references.

This functionally ties into the rest of the app under the http://127.0.0.1:8000/accounts/ URL pattern.
settings.py was updated to include the following settings,

```
LOGIN_REDIRECT_URL = "dashboard"

LOGIN_URL = "login"

LOGOUT_URL = "logout"
```

these of course refer to the relevant templates.