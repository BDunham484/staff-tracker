//import express.js
const express = require('express');
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
//port designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

//express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/api', apiRoutes);

// app.get('/', (req, res) => {
//     res.json({
//         message: "Connection Established"
//     });
// });







//default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
})

//starts express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 