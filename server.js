//import express.js
const express = require('express');
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');
//port designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

//express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Connection Established"
    });
});



//get all employees via a mysql query wrapped in an express.js path/api endpoint
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


//delete an employee
app.delete('/api/employee/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message:  'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
        
    });
});


//add an employee
app.post('/api/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'dept_id', 'salary', 'manager_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO employees (first_name, last_name, role_id, dept_id, salary, manager_id)
            VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.dept_id, body.salary, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});




//default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
})

//starts express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 