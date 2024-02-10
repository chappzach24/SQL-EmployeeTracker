const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

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
		}]);
