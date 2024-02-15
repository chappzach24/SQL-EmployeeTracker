const mysql = require("mysql2");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1725",
  database: "employeesDB",
});
displayTables();
function questions() {
 
  inquirer
    .prompt([
      {
        name: "options",
        type: "list",
        message: "Please select from the menu options",
        choices: [
          "View all Departments",
          "View all roles",
          "View all employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee role",
          "Quit",
        ],
      },
    ])

    .then((answer) => {
      console.log(answer);
      if (answer.options === "View all Departments") {
        viewAllDepartments();
      }

      if (answer.options === "View all roles") {
        viewAllRoles();
      }

      if (answer.options === "View all employees") {
        viewAllEmployees();
      }

      if (answer.options === "Add department") {
        addDepartment();
      }

      if (answer.options === "Add role") {
        addRole();
      }

      if (answer.options === "Add employee") {
        addEmployees();
      }

      if (answer.options === "Update employee role") {
        updateEmployees();
      }

      if (answer.options === "Quit") {
        quit();
      }
    });
}

function displayTables() {
  const query = `
  SELECT 
    e.id AS 'Employee ID',
    e.first_name AS 'First Name',
    e.last_name AS 'Last Name',
    r.title AS 'Role',
    r.salary AS 'Salary',
    d.name AS 'Department',
    CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
  FROM 
    employees e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id
`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log("Employees and Roles Table:");
    console.table(results);
    // questions(); If you want it to loop none stop just commit this back in...
  });
}

function viewAllDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    questions(); // Ask the next question
  });
}

function viewAllRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    questions(); // Ask the next question
  });
}

function viewAllEmployees() {
  const query = "SELECT * from employees";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    questions(); // Ask the next question
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department you would like to add",
      },
    ])
    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.department },
        (err, res) => {
          if (err) throw err;
          console.log("Added new department");
          questions();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for this role:",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID for this role:",
      },
    ])
    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        (err, res) => {
          if (err) throw err;
          console.log("Added new role");
          questions();
        }
      );
    });
}

function addEmployees() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee:",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the role ID for this employee:",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the manager ID for this employee (if applicable):",
      },
    ])
    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id || null,
        },
        (err, res) => {
          if (err) throw err;
          console.log("Added new employee");
          questions();
        }
      );
    });
}

function updateEmployees() {
  // Fetching the list of employees and roles from the database
  const employeeQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees";
  const roleQuery = "SELECT id, title FROM role";

  connection.query(employeeQuery, (err, employeeResults) => {
    if (err) throw err;

    connection.query(roleQuery, (err, roleResults) => {
      if (err) throw err;

      // Prompting to select an employee and their new role
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Select the employee you want to update:",
            choices: employeeResults.map(employee => ({
              name: employee.full_name,
              value: employee.id
            }))
          },
          {
            type: "list",
            name: "newRoleId",
            message: "Select the new role for the employee:",
            choices: roleResults.map(role => ({
              name: role.title,
              value: role.id
            }))
          }
        ])
        .then((answers) => {
          const { employeeId, newRoleId } = answers;

          // Updating the employee's role in the database
          const updateQuery = "UPDATE employees SET role_id = ? WHERE id = ?";
          connection.query(updateQuery, [newRoleId, employeeId], (err, result) => {
            if (err) throw err;
            console.log(`Employee with ID ${employeeId} has been updated with the new role ID ${newRoleId}`);
            questions(); // Ask the next question
          });
        });
    });
  });
}


function quit() {
  connection.end();
}

questions();
