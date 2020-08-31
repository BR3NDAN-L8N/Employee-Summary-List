const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const employeeArr = [];
const currentEmployee = {
    name: '',
    id: '',
    email: ''
}

function addIntern() {
    inquirer.prompt([{
        type: "input",
        message: "Enter Intern's School.",
        name: "school",
    }]).then(function (res) {
        newIntern = new Intern(currentEmployee.name, currentEmployee.id, currentEmployee.email, res.school);
        employeeArr.push(newIntern);

        addAnotherEmployee();
    });
}

function addEngineer() {
    inquirer.prompt([{
        type: "input",
        message: "Enter Engineer's Github.",
        name: "github",
    }]).then(function (res) {
        newEngineer = new Engineer(currentEmployee.name, currentEmployee.id, currentEmployee.email, res.github);
        employeeArr.push(newEngineer);

        addAnotherEmployee();
    });
}

function addManager() {
    inquirer.prompt([{
        type: "input",
        message: "Enter Manager's Office Number.",
        name: "number",
    }]).then(function (res) {
        newManager = new Manager(currentEmployee.name, currentEmployee.id, currentEmployee.email, res.number);
        employeeArr.push(newManager);

        addAnotherEmployee();
    });
}

function addAnotherEmployee() {
    inquirer.prompt([{
        type: "list",
        message: "Add Another Employee?",
        name: "anotherOne",
        choices: [
            'Yes',
            'No'
        ],
    }]).then(function (res) {
        if (res.anotherOne === "Yes") {
            addEmployee();
        } else {
            fs.writeFileSync(outputPath, render(employeeArr), function(err) {
                if (err) throw err;
            });
            // console.log(employeeArr);
        }
    });
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "Enter Employee's Name.",
        name: "name",
    }, {
        type: "input",
        message: "Enter Employee's ID.",
        name: "id",
    }, {
        type: "input",
        message: "Enter Employee's E-mail.",
        name: "email",
    }, {
        type: "list",
        message: "Select Employee's Role.",
        name: "role",
        choices: [
            'Intern',
            'Engineer',
            'Manager'
        ],
    }]).then(function (res) {
        currentEmployee.name = res.name;
        currentEmployee.id = res.id;
        currentEmployee.email = res.email;
        switch (res.role) {
            case "Intern":
                addIntern(res);
                break;
            case "Engineer":
                addEngineer(res);
                break;
            case "Manager":
                addManager(res);
                break;
        }
    });
}

addEmployee();