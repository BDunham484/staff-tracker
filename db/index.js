const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection
            .promise()
            .query(`
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
            `);
    }

    findAllRoles() {
        return this.connection
            .promise()
            .query(`
                SELECT roles.id,
                roles.title,
                department.name
                AS department,
                roles.salary
                FROM roles
                LEFT JOIN department ON roles.department_id = department.id
            `)
    }

    findAllDepartments() {
        return this.connection
            .promise()
            .query(`
                SELECT id, 
                name
                AS department_name
                FROM department
            `)
    }

    addEmployee(res) {
        return this.connection
            .promise()
            .query(`
                INSERT INTO employees
                (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`,
                [res.first_name, res.last_name, res.role_id, res.manager_id]
            )
    }

    findAllEmployeeNames() {
        return this.connection
            .promise()
            .query(`
                SELECT first_name, last_name, id,
                CONCAT(first_name, ' ', last_name)
                AS name
                FROM employees
            `)
    }
}

module.exports = new DB(connection)