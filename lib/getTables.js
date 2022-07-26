//import db methods from DB constructor
const db = require("../db");


//gets a table of all employees
const getEmp = () => {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
}


//adds an employee to the emplyees table
const addEmp = (data) => {
    db.addEmployee(data)
    .then(([rows]) => {
        console.log('Employee has been added.');
    })

}

//gets a table of all roles
const getRoles = () => {
    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
}

//get a table of all departments
const getDept = () => {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
    })
}

//get a table of all employees by manager
const getEmpByManager = (data) => {
    db.findEmployeesByManager(data)
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees)
    })
}

//get a table of all employees by department
const getEmpByDept = (data) => {
    db.findEmployeesByDepartment(data)
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees)
    })
}

//get a table of deparmtnet budgets
const getBudgByDept = (data) => {
    db.getBudgetByDepartment(data)
    .then(([rows]) => {
        let budget = rows;
        console.log("\n");
        console.table(budget)
    })
}


//exports functions
module.exports = {
    getEmp,
    addEmp,
    getRoles,
    getDept,
    getEmpByManager,
    getEmpByDept,
    getBudgByDept
};