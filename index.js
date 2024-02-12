const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1725",
  database: "employeesDB"
});

function questions() {
	inquirer.prompt([{	
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
			]
		}
  ]
)

  .then((answer) =>{
    console.log(answer);
    if (answer.options === "View all Departments"){
      viewAllDepartments();
    }

    if (answer.options === "View all roles"){
      viewAllRoles();
    }
    
    
  })}

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
  questions();