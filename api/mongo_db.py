from mongoengine import *

dev_applications = [
    {
        "name": 'Visual Studio Code',
        "description":
            'Visual Studio Code is a freeware source-code editor made by Microsoft for Windows, Linux and macOS.',
    },
    {
        "name": 'Git',
        "description":
            'Git is software for tracking changes in any set of files, usually used for coordinating work among '
            'programmers collaboratively developing source code during software development.',
    },
    {
        "name": 'Jira',
        "description":
            'Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile '
            'project management.',
    },
    {
        "name": 'Swagger',
        "description":
            'Swagger is an Interface Description Language for describing RESTful APIs expressed using JSON.',
    },
]
qa_applications = [
    {
        "name": 'Pycharm',
        "description":
            'PyCharm is an integrated development environment used in computer programming, specifically for the '
            'Python language.',
    },
    {
        "name": 'Git',
        "description":
            'Git is software for tracking changes in any set of files, usually used for coordinating work among '
            'programmers collaboratively developing source code during software development.',
    },
    {
        "name": 'Jira',
        "description":
            'Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile '
            'project management.',
    },
    {
        "name": 'Test_Manager',
        "description":
            'This is a test case and test suite management app based on releases and deployment',
    },
]

class Table(Document):
    firstname = StringField(required=True)
    lastname = StringField(required=True)
    email = StringField(required=True)
    password = StringField(required=True)
    role = StringField(max_length=30)
    description = ListField()


def save_user(email, firstname, lastname, password):
    connect('users', host='localhost', port=27017)
    for user in Table.objects():
        if email == user.email:
            return False
    user = Table(email=email, firstname=firstname, lastname=lastname, password=password)
    alpha = 'a'
    test_dev = []
    for i in range(0, 13):
        test_dev.append(alpha)
        alpha = chr(ord(alpha) + 1)
    conditions_dev = [lastname.startswith(l) for l in test_dev]
    if any(conditions_dev):
        user.role = 'developer'
        user.description = dev_applications
    else:
        user.role = 'tester'
        user.description = qa_applications
    user.save()
    return True


def fetch_user_for_login(email, password):
    connect('users', host='localhost', port=27017)
    for user in Table.objects():
        if user.email == email:
            if user.password == password:
                return 'pass'
            else:
                return 'wrong password'
    return 'wrong email'


def fetch_all_users():
    connect('users', host='localhost', port=27017)
    lister = []
    my_dict = {}
    for user in Table.objects():
        my_dict['firstname'] = user.firstname
        my_dict['lastname'] = user.lastname
        my_dict['email'] = user.email
        my_dict['role'] = user.role
        lister.append(my_dict)
        my_dict = {}
    return lister


def fetch_user_all_details(email):
    connect('users', host='localhost', port=27017)
    my_dict = {}
    for user in Table.objects(email=email):
        my_dict['firstname'] = user.firstname
        my_dict['lastname'] = user.lastname
        my_dict['email'] = user.email
        my_dict['role'] = user.role
        my_dict['description'] = user.description
    return my_dict


def delete_user(email):
    connect('users', host='localhost', port=27017)
    user = Table.objects(email=email)
    user.delete()
    return True
