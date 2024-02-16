# SQL-EmployeeTracker

The Employee Management System is a command-line tool that simplifies the management of employees, roles, and departments within a company. It offers comprehensive data management, effortless data manipulation, a user-friendly interface, flexible configuration options, and reliability thanks to its Node.js and MySQL technology stack. It provides functionalities such as viewing, adding, updating, and deleting departments, roles, and employees.

[Video on how to use this app](https://drive.google.com/file/d/1cbSC5qEoN64eYZ2eSvcHGcX2s_j2C2Xs/view?usp=sharing)

## Installation
Clone the repository: git clone git@github.com:chappzach24/SQL-EmployeeTracker.git

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd employee-management-system
Install dependencies:

bash
Copy code
npm install
Configure the database connection:

Open the index.js file.
Update the database configuration parameters (host, port, user, password, database) according to your MySQL database setup.
Import the database schema:

Create a MySQL database named employeesDB.
Import the schema.sql file located in the db directory to create the necessary tables.
Usage
To run the application, execute the following command:

bash
Copy code
node index.js
The application will display a menu with various options. Select an option to perform the corresponding action, such as viewing all departments, roles, or employees, adding new departments, roles, or employees, updating employee roles, or deleting departments, roles, or employees.

Features
View all departments, roles, and employees.
Add new departments, roles, and employees.
Update employee roles.
Delete departments, roles, and employees.
Technologies Used
Node.js
MySQL
Inquirer.js
License
This project is licensed under the MIT License.
