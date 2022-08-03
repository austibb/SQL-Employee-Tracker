const inquirer = require('inquirer');

const updateChoices = require('./db/listrequests.js').updateChoices;

const mysql = require('mysql2');

// use .promise() so that we can use await on connection
require('dotenv').config();
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employeeDB',
}).promise();

const viewQueries = [
    'SELECT name FROM department',

    `SELECT title, CONCAT('$', salary) as 'salary', name 
    FROM role 
    LEFT JOIN department
    ON role.department_id = department.id`,

    `SELECT employee.id, first_name, last_name, manager_id, title, CONCAT('$', salary) as 'salary', name 
    FROM employee LEFT JOIN role 
    ON employee.role_id = role.id 
    LEFT JOIN department 
    ON role.department_id = department.id`
];

var departmentList;
var roleList;
var managerList;
var employeeList;

// init function
// Handles inquirer prompts and command line printing
//  calls on other functions to do the work
const init = () => {
    updateLists();
    inquirer.prompt({
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: [
            'Add Department',
            'Add Role',
            'Add Employee',
            'View Departments',
            'View Roles',
            'View Employees',
            'Update Employee Role',
            'Exit'],
    }).then((res) => {
        switch (res.task) {
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Departments':
                viewQuery(0);
                break;
            case 'View Roles':
                viewQuery(1);
                break;
            case 'View Employees':
                viewQuery(2);
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'Exit':
                console.log('thanks, have a good day')
                process.exit();
        };
    })
};

// prompt to add a new department to database
const addDepartment = () => {
    inquirer.prompt(
        [{
            message: 'What is the Department name?',
            name: 'name',
            type: 'input',
        }]
    ).then((res) => {
        try {
            connection.query(`INSERT INTO department (name) VALUES (?)`, [res.name]);
        } catch (error) {
            console.log(error);
        } finally {
            console.log('successfuly added!');
        };
    }).then(() => returnToMain());
};

// prompt to add a new role and relevant data to database
const addRole = () => {
    inquirer.prompt([
        {
            message: "What is the title for this Role?",
            name: 'title',
            type: 'input',
        },
        {
            message: "What is the Salary for this Role?",
            name: 'salary',
            type: 'input',
        },
        {
            message: "What is the Department for this Role?",
            name: 'department',
            type: 'list',
            choices: Object.values(departmentList),
        }
    ]).then((res) => {
        try {
            connection.query(`INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?);`, [res.title, res.salary, getKey(departmentList, res.department)]);
        } catch (error) {
            console.log(error);
        } finally {
            console.log('successfuly added!');
        };
    }).then(() => returnToMain());
};

// prompts for information to use to create a new employee row
const addEmployee = () => {
    inquirer.prompt([
        {
            message: "What is the Employee's full name?",
            name: 'name',
            type: 'input',
        },
        {
            message: "What is the Employee's role?",
            name: 'role',
            type: 'list',
            choices: Object.values(roleList)
        },
        {
            message: "Who is the Employee's manager?",
            name: 'manager',
            type: 'list',
            choices: Object.values(managerList),
        }
    ]).then((res) => {
        let [first, last] = res.name.split(' ').splice(0, 2);
        try {
            connection.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                [first, last, getKey(roleList, res.role), getKey(managerList, res.manager)]);
        } catch (error) {
            console.log(error);
        } finally {
            console.log('successfuly added!');
        };
    }).then(() => returnToMain());
};

// query function to display tables based on the user selection (department, role, employees)
const viewQuery = async (i) => {
    try {
        const table = await connection.query(viewQueries[i]);
        console.log('Viewing All Departments');
        console.table(table[0]);
    } catch (error) {
        console.log(error)
    } finally {
        returnToMain();
    };
};

// prompts for which employee to update role
const updateEmployee = () => {
    inquirer.prompt([
        {
            message: "Which Employee do you want to update?",
            name: 'id',
            type: 'list',
            choices: Object.values(employeeList),
        },
        {
            message: "What is the Employee's role?",
            name: 'role',
            type: 'list',
            choices: Object.values(roleList),
        }
    ]).then((res) => {
        try {
            connection.query(
                `UPDATE employee SET role_id = ? WHERE id = ?`,
                [getKey(employeeList, res.id), getKey(roleList, res.role)]
            );
        } catch (error) {
            console.log(error);
        } finally {
            console.log('successfuly added!');
        };
    }).then(() => returnToMain());
};

// function to let user know the main menu prompt will display
const returnToMain = () => {
    setTimeout(() => {
        setTimeout(() => console.log('Returning to main menu...'), 100);
        let dots = setInterval(() => console.log('.'), 666);
        setTimeout(() => {
            clearInterval(dots)
        }, 2000);
        setTimeout(init, 2000);
    }, 1000);
};

// helper function to update the local stored list data, to be called every time the main prompt is displayed.
const updateLists = async () => {
    [departmentList, roleList, managerList, employeeList] = await updateChoices();
}

// helper function to return the key (id) of the selected value
function getKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
};

init();