//import express.js
const express = require('express');
//imprt mysql;
const mysql = require('mysql2');
//port designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

//express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '+g47|lj-Anzn-<LUQ;?xaK63>qv}',
        database: 'staff'
    },
    console.log('Connected to the staff database.')
)

app.get('/', (req, res) => {
    res.json({
        message: "Connection Established"
    });
});

//test
db.query(`SELECT * FROM employees`, (err, rows) => {
    console.log(rows);
})

//default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
})

//starts express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 