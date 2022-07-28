DROP DATABASE IF EXISTS staff;
CREATE DATABASE staff;
USE staff;


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
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
/*create employees table*/
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);





