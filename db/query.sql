/*select statement to grab and display departments*/
SELECT id, name AS department_name
    FROM department;
/*select statement to grab and display roles*/
SELECT roles.id, roles.title, department.name AS department, roles.salary
    FROM roles
    LEFT JOIN department On roles.department_id = department.id;

/*select statement to grab and display employees*/
SELECT e.id, e.first_name, e.last_name, roles.title AS role, roles.salary, department.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employees m ON e.manager_id = m.id;
    