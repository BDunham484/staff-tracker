INSERT INTO employees (first_name, last_name, role_id, dept_id, salary, manager_id)
VALUES
    ('John', 'Doe', 1, 1, 100000, 1),
    ('Mike', 'Chan', 1, 1, 80000, 1),
    ('Ashley', 'Rodriquez', 1, 1, 150000, 1),
    ('Kevin', 'Tupik', 1, 1, 120000, 3),
    ('Kunal', 'Singh', 1, 1, 160000, 1),
    ('Malia', 'Brown', 1, 1, 125000, 5),
    ('Sarah', 'Lourd', 1, 1, 250000, 1),
    ('Tom', 'Allen', 1, 1, 190000, 7),
    ('Sam', 'Kash', 1, 1, 100000, 3);

INSERT INTO roles (title, department_id, salary)
VALUES
    ('Sales Lead', 1, 100000),
    ('Salesperson', 1, 80000),
    ('Lead Engineer', 2, 150000),
    ('Software Engineer', 2, 120000),
    ('Account Manager', 3, 160000),
    ('Accountant', 3, 125000),
    ('Legal Team Lead', 4, 250000),
    ('Lawyer', 4, 190000);

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');