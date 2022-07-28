const connection = require('../db/connection');


// gets a list of employees first name and id with null as an option
const getEmpNames = () => {
    const sql = `
    SELECT first_name, last_name, id,
    CONCAT(first_name, ' ', last_name)
    AS name
    FROM employees
    `;
    
    return new Promise((resolve, reject) => {
        connection.promise().query(sql)
            .then(([rows, fields]) => {
                let namesArr = [{ name: 'None', value: null }];
                for (let i = 0; i < rows.length; i++) {
                    let choices = {
                        name: rows[i].name,
                        value: rows[i].id
                    };
                    namesArr.push(choices);
                }
                resolve(namesArr)
            });
    });
};


// gets a list of employees first name and id without null as an option
const getEmpNamesNoNull = () => {
    const sql = `
    SELECT first_name, last_name, id,
    CONCAT(first_name, ' ', last_name)
    AS name
    FROM employees
    `;
    
    return new Promise((resolve, reject) => {
        connection.promise().query(sql)
            .then(([rows, fields]) => {
                let namesArr = [];
                for (let i = 0; i < rows.length; i++) {
                    let choices = {
                        name: rows[i].name,
                        value: rows[i].id
                    };
                    namesArr.push(choices);
                }
                resolve(namesArr)
            });
    });
};




    module.exports = {
        getEmpNames,
        getEmpNamesNoNull
    }