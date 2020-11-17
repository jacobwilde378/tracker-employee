let mysql = require('mysql2')
require('dotenv').config()

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
}) 
connection.connect(function(err) {
    if(err) throw err;
    console.log("connected  as id " + connection.threadId)
    
});

module.exports = connection