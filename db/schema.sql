/*create employees table*/
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    dept_id INTEGER NOT NULL,
    salary INTEGER(7) NOT NULL,
    manager_id INTEGER(2)
);

/*create employee roles table*/
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    department_id INTEGER NOT NULL,
    salary DECIMAL(10,2)
    
);

/*create department table*/
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30)
);

