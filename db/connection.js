//import mysql
const mysql = require('mysql2');

//connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '+g47|lj-Anzn-<LUQ;?xaK63>qv}',
        database: 'staff'
    },
    console.log('Connected to the staff database.')
)

connection.connect(function (err) {
    if (err) throw err;
    
});

//export db
module.exports = connection;