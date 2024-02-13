const mysql = require("mysql2");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1725",
  database: "employeesDB",
});

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
    //get a list of employees
    connection.query("SELECT * FROM employees", (err, employees) => {
      if (err) throw err;
  
      
      const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Select the employee you want to update:",
            choices: employeeChoices,
          },
          {
            type: "input",
            name: "newRoleId",
            message: "Enter the new role ID for this employee:",
          },
        ])
        .then((answers) => {
          console.log(answers);
          // Update the employee's role in the database
          connection.query(
            "UPDATE employees SET ? WHERE ?",
            [
              { role_id: answers.newRoleId },
              { id: answers.employeeId },
            ],
            (err, res) => {
              if (err) throw err;
              console.log("Employee role updated successfully");
              questions(); // Prompt main questions again
            }
          );
        });
    });
  }
  

function quit() {
  const query = "SELECT * from employees";
  connection.query(query, (err, results) => {
    if (err) throw err;
    return "";
  });
}

questions();
