

const manageDepartment = async () => {
    // Inquirer Question must be here to Update Choices that require
    // a database query function
    const department = await inquirer.prompt([
        {
            message: 'What would you like to do?',
            name: 'task',
            type: 'list',
            choices: ['View All Departments', 'View a Department Budget', 'Edit Departments'],
        },
        {
            when: (department) => department.task === 'View a Department Budget',
            message: "Which Department's budget do you want to see?",
            name: 'id',
            type: 'list',
            choices: await departmentChoices(),
            // choices: ['dept1', 'dept2', 'dept3']
        }
    ]);

    switch (department.task) {
        case 'View All Departments':
            // handle displaying Departments to console
            try {
                const departments = await connection.query(getAllDepartments);
                console.table('\n\n\n\n\nAll Departments\n', departments[0], '\n');
            } catch (error) {
                console.log(error);
            };
            console.log('viewing all departments');
            console.log('end of path')
            process.exit();


            break;
        case 'Edit Departments':
            // handle Editing Departments in the data base
            editDepartmentsPath();
            console.log('end of path')
            process.exit();


            break;
    };
    // Call init() to see if user wants to quit or continue
    // init();
};

const editDepartmentsPath = async () => {
    const edit = await inquirer.prompt([
        {
            message: 'What would you like to do?',
            name: 'task',
            type: 'list',
            choices: ['Add Department', 'Delete Department'],
        },
        {
            when: (edit) => edit.task === 'Add Department',
            message: 'What is the Department name?',
            name: 'name',
            type: 'input',
        },
        {
            when: (edit) => edit.task === 'Delete Department',
            message: 'Which Department do you want to delete?',
            name: 'id',
            type: 'list',
            // choices: await departmentChoices(),
            choices: ['dept1', 'dept2', 'dept3']
        },
    ]);

    switch (edit.task) {
        case 'Add Department':
            // Add Department to Database
            // try {
            //     await connection.query(addDepartment, [answers.name]);
            //     console.table('\n\n\n\n\nSuccess!!', '\n');
            // } catch (error) {
            //     console.log(error);
            // };
            console.log('adding department');
            break;
        case 'Delete Department':
            // try {
            //     await connection.query(deleteDepartment, [answers.id]);
            //     console.table('\n\n\n\n\nSuccess!!', '\n');
            // } catch (error) {
            //     console.log(error);
            // };
            console.log('deleting deparemnt');
            break;
    };
};


const manageRole = async () => {
    // Inquirer Question must be here to Update Choices that require
    // a database query function
    const role = inquirer.prompt({
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['View All Roles', 'Edit Roles'],
    }).then(() => {
        switch (role.task) {
            case 'View All Roles':
                // handle displaying Roles to console
                // try {
                //     const roles = await connection.query(getAllRoles);
                //     console.table('\n\n\n\n\nAll Roles\n', roles[0], '\n');
                // } catch (error) {
                //     console.log(error);
                // };
                console.log('view');
                console.log('end of path')
                process.exit();


                break;
            case 'Edit Roles':
                // do all edit employees action and inquirer pathway here
                console.log('edit');
                editRolesPath();
                console.log('end of path')
                process.exit();


                break;
        }
    }).then(
        // Call init() to see if user wants to quit or continue
        // init
    );

    // const answers = await inquirer.prompt(roleQ);

};

const editRolesPath = async () => {
    console.log('editrolespath');
    const edit = await inquirer.prompt([
        {
            message: 'What would you like to do?',
            name: 'task',
            type: 'list',
            choices: ['Add Role', 'Delete Role'],
        },
        {
            when: (edit) => edit.task === 'Add Role',
            message: "What is the title for this Role?",
            name: 'title',
            type: 'input',
        },
        {
            when: (edit) => edit.task === 'Add Role',
            message: "What is the Salary for this Role?",
            name: 'salary',
            type: 'input',
        },
        {
            when: (edit) => edit.task === 'Add Role',
            message: "What is the Department for this Role?",
            name: 'department',
            type: 'list',
            // choices: await departmentChoices(),
            choices: ['fuck', 'fuk', 'ok']
        },
        {
            when: (edit) => edit.task === 'Delete Role',
            message: "Which Role do you want to delete?",
            name: 'id',
            type: 'list',
            // choices: await rolesChoices(),
            choices: ['one', 'two', 'there', 'four']
        },
    ]);
    switch (edit.task) {
        case 'Add Role':
            // Add Role to Database
            // try {
            //     await connection.query(addRole, [edit.title, edit.salary, edit.department]);
            //     console.table('\n\n\n\n\nSuccess!!', '\n');
            // } catch (error) {
            //     console.log(error);
            // };
            console.log('adding role');
            break;
        case 'Delete Role':
            // try {
            //     await connection.query(deleteRole, [edit.id]);
            //     console.table('\n\n\n\n\nSuccess!!', '\n');
            // } catch (error) {
            //     console.log(error);
            // };
            console.log('deleeetting');
            break;
    };
};

const manageEmployee = async () => {
    // Inquirer Question must be here to Update Choices that require
    // a database query function

    const employeeAction = await inquirer.prompt({
        message: 'What would you like to do?',
        name: 'task',
        type: 'list',
        choices: ['View Employees', 'Edit Employees'],
    }).then((employeeAction) => {
        switch (employeeAction.task) {
            case 'View Employees':
                // do all view employee things in a seperate function
                viewEmployeePath();
                console.log('view');
                console.log('end of path')
                process.exit();
                break;
            case 'Edit Employees':
                // do all edit employees action and inquirer pathway here
                console.log('edit');
                editEmployeePath();
                console.log('end of path')
                process.exit();
                break;
        }
    }).then(init);
};

const viewEmployeePath = async () => {
    const view = await inquirer.prompt({
        message: 'How would you like to view Employees?',
        name: 'choice',
        type: 'list',
        choices: ['View All', 'By Manager', 'By Department'],
    });

    switch (view.choice) {
        case 'View All':
            // try {
            //     const employees = await connection.query(getAllEmployees);
            //     console.table('\n\n\n\n\nAll Employees', employees[0], '\n');
            // } catch (error) {
            //     console.log(error);
            // };
            break;
        case 'By Manager':
            // try {
            //     const employees = await connection.query(getEmployeesByManager);
            //     console.table('\n\n\n\n\nEmployees Grouped by Manager', employees[0], '\n');
            // } catch (error) {
            //     console.log(error);
            // };
            break;
        case 'By Department':
            // try {
            //     const employees = await connection.query(getEmployeesByDepartment);
            //     console.table('\n\n\n\n\nEmployees Grouped by Department', employees[0], '\n');
            // } catch (error) {
            //     console.log(error);
            // };
            break;
    };
};

const editEmployeePath = () => {

    inquirer.prompt([
        {
            message: 'What would you like to doadsfaf?',
            name: 'task',
            type: 'list',
            choices: ['Add Employee', 'Update Employee Role', 'Delete Employee'],
        },
        {
            when: (answers) => answers.task === 'Add Employee',
            message: "What is the Employee's full name?",
            name: 'name',
            type: 'input',
        },
        {
            when: (answers) => answers.task === 'Add Employee',
            message: "What is the Employee's role?",
            name: 'role',
            type: 'input',
        },
        {
            when: (answers) => answers.task === 'Add Employee',
            message: "Who is the Employee's manager?",
            name: 'manager',
            type: 'list',
            // choices: await managerChoices(),
            choices: ['steve', 'asdfaf', 'asdfas', 'asdfadsfasfa'],
        }


        // {
        //     when: (answers) => answers.editTask === 'Update Employee Role'
        //     message: "Which Employee do you want to update?",
        //     name: 'id',
        //     type: 'list',
        //     // choices: await employeeChoices(),
        //     choices: ['Manage Departments', 'Manage Employees', 'Manage Roles', 'Exit'],
        // },
        // {
        //     when: (answers) => answers.editTask === 'Update Employee Role'
        //     message: "What is the Employee's role?",
        //     name: 'role',
        //     type: 'list',
        //     // choices: await rolesChoices(),
        //     choices: ['Manage Departments', 'Manage Employees', 'Manage Roles', 'Exit'],
        // },


        // {
        //     when: (answers) => answers.editTask === 'Delete Employee'
        //     message: "Which Employee do you want to delete?",
        //     name: 'id',
        //     type: 'list',
        //     choices: await employeeChoices(),
        // },
    ]).then((res) => {

        switch (res.task) {
            case 'Add Employee':
                console.log(edit.name);
                console.log(edit.role);
                console.log(edit.manager);
                addEmployee()
                break;
            case 'Update Employee Role':
                console.log('updating role');
                break;
            case 'Delete Employee':
                console.log('deleting');
                break;
        };
        console.log('end of edit employee path')
            // process.exit();
            ;
    })

};

function addEmployee() {
    asdfasd().then(() => init())
}
