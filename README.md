# wallapp
Full-Stack application: Wall App

**Django Backend:**\
(Need `python{3}`, `python venv`, and `pip`)\
\
*Make sure you are in the root of the git repo\
*Make a virtual environment: `python -m venv django-rest`\
*Activate the virtual environment: `source django-rest/bin/activate`\
*Install needed python packages: `python -m pip install -r requirements.txt`\
*Run the django server: `python backend/manage.py runserver`\
(To leave the virtual environment: `deactivate`)\
\
**React Frontend:**\
(Need `npm`)\
\
*Make sure you are in the root of the git repo\
*Change directory: `cd frontend/`\
*Install needed npm packages: `npm i`\
*Run the react app (requires django backend to be online): `npm start` and it will take you to http://localhost:3000/ in your web browser\
\
**Unit Tests:**\
*Make sure you are in the root of the git repo\
*Activate the virtual environment (Need to go through **`Django Backend`** steps): `source django-rest/bin/activate`\
*Run the tests for User API: `python backend/manage.py test users`\
*Run the tests for Post API: `python backend/manage.py test posts`
