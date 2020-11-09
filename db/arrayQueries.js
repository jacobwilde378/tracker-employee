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
    find_one_emp(id) {
        let sql = `select * from employee WHERE id = '${id}'`
        return this.connection.promise().query(sql)
    }
    find_one_role(id) {
        let sql = `SELECT * from role WHERE id = '${id}'`
        return this.connection.promise().query(sql)
    }
    find_one_dept(id) {
        let sql = `SELECT * FROM department WHERE id = '${id}'`
        return this.connection.promise().query(sql)
    }
    addEmployee(first_name, last_name, role_id, manager_id) {
        if(manager_id.length === 0) {
            let sql =  `INSERT INTO employee 
            (first_name, last_name, role_id) 
            VALUES ("${first_name}", "${last_name}", "${role_id}")`
            return this.connection.promise().query(sql)
        } else {
            let sql =  `INSERT INTO employee 
            (first_name, last_name, role_id, manager_id) 
            VALUES ("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`
            return this.connection.promise().query(sql)
        }
        
    }
    updateEmployee(id,first_name, last_name, role_id, manager_id) {
        if(manager_id.length === 0) {
            let sql = `UPDATE employee SET 
            first_name = '${first_name}',
            last_name = '${last_name}',
            role_id = '${role_id}',
            manager_id = null
            WHERE id = '${id}'`
            return this.connection.promise().query(sql)
            }
        else {
            let sql = `UPDATE employee SET 
            first_name = '${first_name}',
            last_name = '${last_name}',
            role_id = '${role_id}',
            manager_id = '${manager_id}'
            WHERE id = '${id}'`
            return this.connection.promise().query(sql)
        }
    }
    deleteEmployee(id) {
        let sql = `DELETE FROM employee WHERE id = '${id}'`
        return this.connection.promise().query(sql)
    }
    addRole(title, salary, department_id) {
        let sql = `INSERT INTO role
        (title, salary, department_id) 
        VALUES ('${title}','${salary}','${department_id}')`
        return this.connection.promise().query(sql)
    }
    updateRole(id, title, salary, department_id){
        let sql = `UPDATE role SET 
        title = '${title}',
        salary = '${salary}',
        department_id = '${department_id}'
        WHERE id = '${id}'`
        return this.connection.promise().query(sql)
    }
    deleteRole(id) {
        let sql = `DELETE FROM role WHERE id = '${id}'`
        return this.connection.promise().query(sql)
    }
    addDept(name) {
        let sql = `INSERT INTO department 
        (name) 
        VALUES('${name}')`
        return this.connection.promise().query(sql)
    }
    updateDept(id,name) {
        let sql = `UPDATE department SET 
        name = '${name}' 
        WHERE id = '${id}'`
        return this.connection.promise().query(sql)
    }
    deleteDept(id) {
        let sql = `DELETE FROM department WHERE id = '${id}'`
        return this.connection.promise().query(sql)
    }
    viewEmployee() {
        let sql = `SELECT * FROM employee`
        return this.connection.promise().query(sql)
    }
    viewRole() {
        let sql = `SELECT * FROM role`
        return this.connection.promise().query(sql)
    }
    viewDept() {
        let sql = `SELECT * From department`
        return this.connection.promise().query(sql)
    }
}

module.exports = new DB(connection)