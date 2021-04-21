from flask import Flask, jsonify, request
from flask_cors import CORS
from mongo_db import *

app = Flask(__name__)

CORS(app)


@app.route('/')
def hello():
    return 'Your are welcome to Magneto Backend'


# 1. for login - email, password - return true or false
@app.route('/login', methods=['POST'])
def login():
    content = request.get_json()
    email = content["email"]
    password = content["password"]
    value = fetch_user_for_login(email, password)
    if value == 'pass':
        return 'pass'
    elif value == 'wrong password':
        return "The password that you've entered is incorrect. Forgotten password?"
    elif value == 'wrong email':
        return "The email address you entered isn't connected to an account. Please create an account"
    return 'fail'


# 2. for adding users - id, firstname, lastname, email, password, designation, application - true or false
@app.route('/create-user', methods=['POST'])
def create_user():
    content = request.get_json()
    login_email = content["email"]
    firstname = content["firstname"]
    lastname = content["lastname"]
    password = content["password"]
    boolean = save_user(login_email, firstname, lastname, password)
    if boolean:
        return 'User saved successfully'
    else:
        return 'Saving user failed, email already exists.'


# 3. for listing only some of the details - id, firstname - firstname, lastname, email
@app.route('/list-users')
def list_user():
    list_of_users = fetch_all_users()
    return jsonify(list_of_users)


# 4. for showing the details - firstname, lastname, email, designation, application
@app.route('/show-details/email/<email>')
def show_details(email):
    login_email = '%s' % email
    user_details = fetch_user_all_details(login_email)
    return jsonify(user_details)


# 5. for deleting users - email
@app.route('/delete-user/email/<email>', methods=['DELETE'])
def delete_by_email(email):
    login_email = '%s' % email
    boolean = delete_user(login_email)
    if boolean:
        return 'User deleted successfully'
    else:
        return "Deletion failed, email didn't already exists."
