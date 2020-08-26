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

function engineer(res) {
    //ask for github via inquiere (engineerRes)

    //100% of the time after all thequestions create the new instance of each obj (engineer )
    //let newGuy= new Engineer(res,res,res,engineerRes)
    //push him into the array

    //ask if there are moreemployees
    //run questions again addEmployees()
    //if there are no more
    //run the template passing in the array of objects
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```