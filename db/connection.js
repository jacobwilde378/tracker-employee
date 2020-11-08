let mysql = require('mysql2')

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Cooper378!',
    database: 'employee_tracker'
}) 
connection.connect(function(err) {
    if(err) throw err;
    console.log("connected  as id " + connection.threadId)
    
});

module.exports = connection