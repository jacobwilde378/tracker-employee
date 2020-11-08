let connection = require('../db/connection')
const Employee = {
    add: function (first_name, last_name, role_id, manager_id) {
        let params = [first_name, last_name, role_id, manager_id]
        let sql = `INSERT INTO employee 
        (first_name, last_name, role_id, manager_id) 
        VALUES (?, ?, ?, ?)`
        const query = connection.query(sql, params, (err, result) => {
            if (err) throw err;
        })
        return
    },

    update: function (id, first_name, last_name, role_id, manager_id) {
        let sql = `UPDATE employee SET
         first_name = '${first_name}',
         last_name = '${last_name}',
         role_id = '${role_id}',
         manager_id = '${manager_id}' 
         WHERE id = '${id}'`

        const query = connection.query(sql, (err, result) => {
            if (err) throw err;
            return "Employee Updated!"
        })

    },

    purge: function (id) {
        let sql = `DELETE FROM employee WHERE id = ${id}`

        const query = connection.query(sql, (err, result) => {
            if (err) throw err;
            return "Employee Purged!"
        })

    },
}

module.exports = Employee