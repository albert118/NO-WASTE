# NO-WASTE
(Negating Overspending and Waste via Algorithms Searching Tasty Easy Recipes ) UTS Data Systems Spring Session 2020

# Set-Up (Development)

**Prior to the following set up, please ensure Python (3.6.x or 3.8.x) and Java 8 are installed.**

## JavaScript and NPM

1. Start by setting up the npm development environment. If you only wish to develop Python elements of this project, install npm and the jsdoc dependency to avoid build errors on docs compilation.

2. cd to `src/frontend` and run `npm install`.

3. Now run `npm start`. This should start the SPA on localhost:3000 and be ready to go for frontend dev.

## Python
#### Note:

If you wish to set up the production environment for serving this, then further MySQL configuration will be required. By default the mysql_connector is included in python's requirements.txt, **if you are not doing setting up MySQL for production or full database testing, then remove the dep.**

If you are, then on a Linux environment the following install command is requried:

`sudo apt-get install libmysqlclient-dev python-dev`

**If you are not setting up production read on.**

To set-up a development environment for Python, install virtualenv. Pip is the prefered way to install Python packages and is included most Python installations by default. 

Depending on your system **Python may utilise a different command-line handle!** Common handles are, 
`python`
`python3`
`python36`
`py`

1. Run the following to install virtualenv,
`python -m pip install virtualenv --user`

2.  Change to your prefered development directory and run the following commands,

`git clone https://github.com/albert118/NO-WASTE.git`
`cd NO-WASTE`
`virtualenv .`

3. Set up local environement variables

a. Create `local.env` in `NO-WASTE` directory.

b. Create and populate the following fields:


### Windows 

```
DEBUG=True
BASE_DIR=PATH_TO_YOUR_SRC_PROJECT_DIR
ALLOWED_HOSTS=127.0.0.1
DJANGO_SECRET_KEY=DJANGO_KEY_NOT_REQUIRED_IN_DEV
WEATHERSTACK_API_KEY=YOUR_API_KEY_HERE
```

### Unix (Linux or OS X)

```
DEBUG=True
BASE_DIR=PATH_TO_YOUR_SRC_PROJECT_DIR
ALLOWED_HOSTS=127.0.0.1
DJANGO_SECRET_KEY=DJANGO_KEY_NOT_REQUIRED_IN_DEV
WEATHERSTACK_API_KEY=YOUR_API_KEY_HERE
```

Note: if using WSL then you base-dir should look like this example,
e.g. `BASE_DIR=/mnt/d/Coding/NO-WASTE/src/`

c. populate the django secret key with a random one from [this tool](https://djecrety.ir/).

Import the var's. This changes per OS. Windows should Win+R `sysdm.cpl` and add them then restart the console. Linux and OS X should source the env file.

### Windows

Start with `Scripts\activate`:
*prompt should change to:*
`(NO-WASTE) C:\NO-WASTE> `

3.  Install the Python dependencies:

`python -m pip install -r requirements.txt --user`

4. Make the docs:

`cd docs`
`make html`

### Unix (Linux or OS X)

`source scripts\activate`

3.  Install the Python dependencies:

`python -m pip install -r requirements.txt --user`

4. Make the docs:

`cd docs`
`make html`

Then open build\index.html with your web browser of choice.

## The Django Secret Key

The Django Secret key is only required for consistency across sessions and Django-based "events". It used by Django backend to create hashes for passwords and session caches.For more information on it read [this](https://stackoverflow.com/questions/7382149/purpose-of-django-setting-secret-key), and [this](https://stackoverflow.com/questions/51657422/are-django-secret-keys-per-instance-or-per-app).

##  Contributing (using Git)

As is standard, master is protected and cannot be pushed to directly. All features must pass unit and integration testing in the develop staging branch prior to being commited to master.

Working locally via the command line is required. If you're not familiar then checkout the guide on the Git site to basic [branching and merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging), as well as [this](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners) quick guide to basic repo work. Lastly, to avoid extraneous git commit messages, follow [this](https://medium.com/@slamflipstrom/a-beginners-guide-to-squashing-commits-with-git-rebase-8185cf6e62ec) Medium tutorial for a guide on squashing commits together. The result of that should be a file like the lines below, where all commits are combined into one commit per feature prior to merges into master or develop. **This rebasing process must be done before pushing to remote!!** Check the last SHA with `git cherry -v --abbrev=5`.

```
reword 60042c8 Feature X: Working! Adds X, Y and Z to functionality of feature.
squash 60042c8 Fixed typo
squash 83c9bbb blah blah
squash 83c9bbb fixed breaking my code from Stackoverflow...
```

Finally, feautures are branches with the naming scheme 'feature/myNewFeature' and are always based off of develop. Prior to merging back into develop, applying a rebase (post squashing) to your feature will update it to the current history of develop - avoiding any potential issues.
