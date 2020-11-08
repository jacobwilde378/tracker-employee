const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }
    find_emp_array() {
        let sql = `SELECT id, first_name, last_name FROM employee`
        return this.connection.promise().query(sql)
    }
    find_role_array() {
        let sql = `select * from role`
        return this.connection.promise().query(sql)
    }
    find_dept_array() {
        let sql = `select * from department`
        return this.connection.promise().query(sql)
    }
    addEmployee(first_name, last_name, role_id, manager_id) {
        let sql =  `INSERT INTO employee 
        (first_name, last_name, role_id, manager_id) 
        VALUES ("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`
        return this.connection.promise().query(sql)
    }
}

module.exports = new DB(connection)