const inquirer = require('inquirer');
const express = require('express');
const connection = require('./db/connection');
const db = require('./db');
const { getEmp, addEmp, getRoles, getDept } = require('./lib/getTables');
const { getEmpNames, getRolesList } = require('./lib/getListChoices');


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
                console.log(value);
                break;
            case 'viewDept':
                getDept()
                startOver();
                break;
            case 'addDept':
                console.log(value);
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



//update employee role question
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
                console.log(data)
                startOver();
            })
        })
    }
    startUpdateRole();
}

const startOver = () => {
    setTimeout(() => {
        startTracker();
    }, "1000");
}




init();


