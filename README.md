# QL Employee Tracker
The SQL Employee Tracker is a command-line tool designed to streamline the management of employees, roles, and departments within a company. Built with Node.js and MySQL, this application offers robust data management capabilities, effortless data manipulation, a user-friendly interface, and flexible configuration options.

## Installation
To get started with the SQL Employee Tracker, follow these simple installation steps:

Clone the repository: git clone git@github.com:chappzach24/SQL-EmployeeTracker.git

Navigate to the project directory:

Install dependencies: npm install

Configure the database connection:

Open the index.js file.
Update the database configuration parameters (host, port, user, password, database) according to your MySQL database setup.
Import the database schema:

Create a MySQL database named employeesDB.
Import the schema.sql file located in the db directory to create the necessary tables.

## Usage
To run the application, execute the following command: node index.js

The application will display a menu with various options. Select an option to perform the corresponding action, such as viewing all departments, roles, or employees, adding new departments, roles, or employees, updating employee roles, or deleting departments, roles, or employees.

## Features
View all departments, roles, and employees.
Add new departments, roles, and employees.
Update employee roles.
Delete departments, roles, and employees.
Technologies Used
Node.js
MySQL
Inquirer.js

## License
This project is licensed under the MIT License.

