/*create employees table*/
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

/*create department table*/
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30)
);

/*create employee roles table*/
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    department_id INTEGER,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);
/*create employees table*/
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
    -- FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);





