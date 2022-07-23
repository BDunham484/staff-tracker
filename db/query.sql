/*select statement to grab and display employees*/
SELECT e.first_name, e.last_name, roles.title AS role, roles.salary, department.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employees m ON e.manager_id = m.id;
    