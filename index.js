//import inquirer
const inquirer = require('inquirer');
//import db directory and access to the DB constructor methods
const db = require('./db');
//import functions that display tables
const { getEmp, addEmp, getRoles, getDept, getEmpByManager, getEmpByDept, getBudgByDept } = require('./lib/getTables');
//import functions that display lists of employee names
const { getEmpNames, getEmpNamesNoNull } = require('./lib/getListChoices');
require("console.table");
//function call to clear screen when user enacts a keystroke
clearScreen();
//function to initialize app
const init = () => {
    console.log("Employees, Departments, and Roles Interface")
    startTracker();
}
//function to clear screen on keystroke
function clearScreen() {
    process.stdin.on('keypress', (str, key) => {
        if (key) {
            console.clear();
        }
    });
}

//funtion that holds initial question and switch case that routes the response
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
                },
                {
                    name: 'Update Employee Managers',
                    value: 'updateMan'
                },
                {
                    name: "View Employee's By Manager",
                    value: 'byManager'
                },
                {
                    name: 'View Employees By Department',
                    value: 'byDepartment'
                },
                {
                    name: 'Delete Departments',
                    value: 'delDept'
                },
                {
                    name: 'Delete Roles',
                    value: 'delRole'
                },
                {
                    name: 'Delete Employees',
                    value: 'delEmp'
                },
                {
                    name: 'View budget per department',
                    value: 'getBudgets'
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
            case 'updateMan':
                startUpdateMan();
                break;
            case 'byManager':
                startByManager();
                break;
            case 'byDepartment':
                startByDept();
                break;
            case 'delDept':
                startDelDept();
                break;
            case 'delRole':
                startDelRole();
                break;
            case 'delEmp':
                startDelEmp();
                break;
            case 'getBudgets':
                startBudgets();
                break;
            default:
                startTracker();
        };
    });
};

//function that houses a series of questions/functions to add an employtee
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




//questions to update an employees manager
const startUpdateMan = () => {
    const listEmp = () => {
        getEmpNamesNoNull().then(names => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'name',
                    message: "Which employee's manager would you like to update?",
                    choices: names
                }
            ]).then(res => {
                getMan(res);
            })
        })
    }

    const getMan = (res) => {
        let data = res;
        getEmpNames().then(names => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Please select the new manager?",
                    choices: names
                }
            ]).then(res => {
                data.manager_id = res.manager_id;
                db.updateMan(data);
                console.log(`Employee's manager has been updated.`);
                init();
            })
        })
    }
    listEmp();
}




//question to view employees by manager
const startByManager = () => {
    db.findManagers()
    .then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(({ id, name }) => ({
            name: name,
            value: id 
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'manager_id',
                message: "Which manager's employee's would you like to see?",
                choices: managerChoices
            }
        ])
        .then(res => {
            getEmpByManager(res);
            startOver();
        })
    });
};





//questions to view employees by department
const startByDept = () => {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const deptChoices = departments.map(({ id, department_name }) => ({
            name: department_name,
            value: id 
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: "Which department's employee's would you like to see?",
                choices: deptChoices
            }
        ])
        .then(res => {
            getEmpByDept(res);
            startOver();
        })
    })
}





//question to start department deletions
const startDelDept = () => {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const deptChoices = departments.map(({ id, department_name }) => ({
            name: department_name,
            value: id 
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: "Which department's would you like to delete?",
                choices: deptChoices
            }
        ])
        .then(res => {
            db.deleteDepartment(res)
            console.log("The department has been deleted.")
            startOver();
        })
    })
}





//question to start role deletions
const startDelRole = () => {
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
                message: "Which role would you like to delete?",
                choices: roleChoices
            }
        ])
        .then(res => {
            db.deleteRole(res);
            console.log("The role has been deleted.");
            init();
        });
    });
}




//question to start employee deletion
const startDelEmp = () => {
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
                    message: "Which employee's would you like to delete?",
                    choices: empNames
                }
            ])
            .then(res => {
                db.deleteEmployee(res);
                console.log("Employee has been deleted.");
                init();
            })
        })
}





//start questions to get budgets
const startBudgets = () => {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const deptChoices = departments.map(({ id, department_name }) => ({
            name: department_name,
            value: id 
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: "Which department's budget would you like to see?",
                choices: deptChoices
            }
        ])
        .then(res => {
            getBudgByDept(res);
            startOver();
        })
    })
}

//function to start questions over after a second
const startOver = () => {
    setTimeout(() => {
        startTracker();
    }, "1000");
}



//initialize app function call
init();


