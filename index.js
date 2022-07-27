const inquirer = require('inquirer');
const db = require('./db');
const { getEmp, addEmp, getRoles, getDept } = require('./lib/getTables');
const { getEmpNames } = require('./lib/getListChoices');
require("console.table");


const init = () => {
    console.log("Employees, Departments, and Roles Interface")
    startTracker();
}


const startTracker = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'toDo',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'viewEmp'
                },
                {
                    name: 'Add Employee',
                    value: 'addEmp'
                },
                {
                    name: 'Update Employee Role',
                    value: 'updateRole'
                },
                {
                    name: 'View All Roles',
                    value: 'viewRoles'
                },
                {
                    name: 'Add Role',
                    value: 'addRole'
                },
                {
                    name: 'View All Departments',
                    value: 'viewDept'
                },
                {
                    name: 'Add Department',
                    value: 'addDept'
                }
            ]
        }
    ]).then(res => {
        let value = res.toDo;
        switch (value) {
            case 'viewEmp':
                getEmp();
                startOver();
                break;
            case 'addEmp':
                addEmpQuestions();
                break;
            case 'updateRole':
                updateEmpRole();
                break;
            case 'viewRoles':
                getRoles();
                startOver();
                break;
            case 'addRole':
                addEmpRole();
                break;
            case 'viewDept':
                getDept()
                startOver();
                break;
            case 'addDept':
                addDept();
                break;
            default:
                startTracker();
        };
    });
};


const addEmpQuestions = () => {
    const startAddEmp = () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
                validate: firstNameInput => {
                    if (firstNameInput) {
                        return true;
                    } else {
                        console.log("Please enter the employee's first name.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?",
                validate: lastNameInput => {
                    if (lastNameInput) {
                        return true;
                    } else {
                        console.log("Please enter the employee's last name.");
                        return false;
                    };
                }
            }
        ]).then(res => {
            getNewEmpRoles(res)
        })
    }
    
    
    const getNewEmpRoles = (res) => {
        let data = res;
        db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));
    
            inquirer.prompt([
                {
                    type: 'list',
                    name: "role_id",
                    message: "What is the employee's role?",
                    choices: roleChoices
                }
            ])
            .then(res => {
                data.role_id = res.role_id
                endAddEmp(data)
            });
        });
    };
    
    const endAddEmp = (res) => {
        let data = res;
        getEmpNames().then(names => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Who is the employee's manager?",
                    choices: names
                }
            ]).then(res => {
                data.manager_id = res.manager_id;
                addEmp(data);
                startOver();
            })
        })
    }
    startAddEmp();
}



//update employee role questions
const updateEmpRole = () => {
    const startUpdateRole = () => {
        db.findAllEmployeeNames()
        .then(([rows]) => {
            let names = rows;
            const empNames = names.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'empNames',
                    message: "Which employee's role would you like to update?",
                    choices: empNames
                }
            ])
            .then(res => {
                endUpdateRole(res);
            })
        })
    }

    const endUpdateRole = (res) => {
        let data = res;
        db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Which role do you want to assign the selected employee?',
                    choices: roleChoices
                }
            ])
            .then(res => {
                data.role_id = res.role_id;
                db.updateEmployeeRole(data)
                console.log("Role has been updated")
                init();
            })
        })
    }
    startUpdateRole();
}





//questions to add a role
const addEmpRole = () => {
    db.findAllDepartments()
    .then(([rows]) => {
        let department = rows;
        const deptChoices = department.map(({ id, department_name }) => ({
            name: department_name,
            value: id
        }));

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?',
                validate: titleInput => {
                    if (titleInput) {
                        return true;
                    } else {
                        console.log('Please enter a role')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log('Please enter a salary.');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: deptChoices
            }
        ]).then(res => {
            db.addRole(res);
            console.log(`${res.title} has been added.`);
            init();
        })
    })
}




//start add department question
const addDept = () => {
    return inquirer.prompt([
        {
            type: 'input', 
            name: 'addDept',
            message: 'What is the name of the department?',
            validate: deptInput => {
                if (deptInput) {
                    return true;
                } else {
                    console.log('Please enter a department.');
                    return false;
                }
            }
        }
    ])
    .then(res => {
        db.addDept(res);
        console.log(`${res.addDept} has been added.`);
        init();
    })
}

const startOver = () => {
    setTimeout(() => {
        startTracker();
    }, "1000");
}




init();


