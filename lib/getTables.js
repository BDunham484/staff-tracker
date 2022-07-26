const express = require('express');
const { promise } = require('../db/connection');
const db = require('../db/connection');


//gets a table of all employees
const getEmp = () => {
    const sql = `
    SELECT e.id,
    e.first_name, 
    e.last_name, 
    roles.title 
    AS role, 
    roles.salary, 
    department.name 
    AS department, 
    CONCAT(m.first_name, ' ', m.last_name)
    AS manager 
    FROM employees e 
    LEFT JOIN roles ON e.role_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id 
    LEFT JOIN employees m ON e.manager_id = m.id
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
            return;
        }
        console.table(rows);
    });
};

//gets a list of employees first name and id

const getEmpNames = () => {
    const sql = `
    SELECT first_name, last_name, id,
    CONCAT(first_name, ' ', last_name)
    AS name
    FROM employees
    `;
    return new Promise((resolve, reject) => {
        db.promise().query(sql)
        .then( ([rows, fields ]) => {
            let namesArr = [{ name: 'None', value: null}];
            for (let i = 0; i < rows.length; i++) {
                let choices = { name: rows[i].name,
                                value: rows[i].id};
                namesArr.push(choices);
            }
            resolve(namesArr)
        });
    });
};



//adds an employee to the employees table
const addEmp = (res) => {
    const sql = `
        INSERT INTO employees
        (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
    `;
    const params = [res.first_name, res.last_name, res.role_id, res.manager_id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            throw err;
            return;
        }
        console.log(`${res.first_name} has been added.`);
    })
};


//gets a table of all roles
const getRoles = () => {
    const sql = `
    SELECT roles.id,
    roles.title,
    department.name
    AS department,
    roles.salary
    FROM roles
    LEFT JOIN department ON roles.department_id = department.id
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
            return;
        }
        console.table(rows);
    });
};



//gets a table of all departments
const getDept = () => {
    const sql = `
    SELECT id, 
    name
    AS department_name
    FROM department
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
            return;
        }
        console.table(rows);
    });
};

module.exports = {
        getEmp,
        addEmp,
        getEmpNames,
        getRoles,
        getDept
};