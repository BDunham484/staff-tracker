const inquirer = require('inquirer');
const express = require('express');
const db = require('./db/connection');
const { getEmp, addEmp, getRoles, getDept, getEmpNames } = require('./lib/getTables');





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
                startAddEmp();
                break;
            case 'updateRole':
                console.log(value);
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


//questions to add new employee
const startAddEmp = () => {
    getEmpNames().then(names => {
        console.log(names)
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
            },
            {
                type: 'list',
                name: 'role_id',
                message: "What is the employee's role?",
                choices: [
                    {
                        name: 'Customer Service',
                        value: 'customerService'
                    },
                    {
                        name: 'Sales Lead',
                        value: 1
                    },
                    {
                        name: 'Salesperson',
                        value: 2
                    },
                    {
                        name: 'Lead Engineer',
                        value: 3
                    },
                    {
                        name: 'Software Engineer',
                        value: 4
                    },
                    {
                        name: 'Account Manager',
                        value: 5
                    },
                    {
                        name: 'Accountant',
                        value: 6
                    },
                    {
                        name: 'Legal Team Lead',
                        value: 7
                    },
                    {
                        name: 'Lawyer',
                        value: 8
                    }
                ]
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Who is the employee's manager?",
                choices: names
            }
        ]).then(res => {
        addEmp(res);
        startOver();
        })
    })    
}


//update employee questions
const startUpdateEmp = () => {
    return inquirer.prompt([
        {
            type: 'list'
        }
    ])
}

const startOver = () => {
    setTimeout(() => {
        startTracker();
    }, "1000");
}


// getEmpNames();
startTracker();

