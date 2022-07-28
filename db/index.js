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

    addEmployee(data) {
        return this.connection
            .promise()
            .query(`
                INSERT INTO employees
                (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`,
                [data.first_name, data.last_name, data.role_id, data.manager_id]
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

    updateEmployeeRole(data) {
        return this.connection
            .promise()
            .query(`
                UPDATE employees
                SET role_id = ?
                WHERE id = ?`,
                [data.role_id, data.empNames]
            )
    }

    addRole(data) {
        return this.connection
            .promise()
            .query(`
                INSERT INTO roles
                (title, salary, department_id)
                VALUES (?, ?, ?)`,
                [data.title, data.salary, data.department]
            )
    }

    addDept(data) {
        return this.connection
            .promise()
            .query(`
                INSERT INTO department
                (name)
                VALUES (?)`,
            [data.addDept]
            )
    }

    updateMan(data) {
        return this.connection
            .promise()
            .query(`
                UPDATE employees
                SET manager_id = ?
                WHERE id = ?`,
                [data.manager_id, data.name]
            )
    }

    findManagers() {
        return this.connection
            .promise()
            .query(`
                SELECT first_name, last_name, id,
                CONCAT(first_name, ' ', last_name)
                AS name
                FROM employees
                WHERE manager_id IS NULL 
            `)
    }

    findEmployeesByManager(data) {
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
                WHERE e.manager_id = ? `,
                [data.manager_id]
            )
    }

    findEmployeesByDepartment(data) {
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
                WHERE department_id = ? `,
                [data.department_id]
            )
    }
}

module.exports = new DB(connection)

