const db = require("../../db/arrayQueries");
const inquirer = require('inquirer')
const Employee = require('../employee')
const alps = require('../../server.js')

console.log("this",alps)
console.log('Nope', Employee)


let empArray = []
let roleArray = []
let deptArray = []

const inqData = {
    mainMenuQuestions: function () {
        let questionArray = [
            {
                type: 'list',
                name: 'mainMenuSelection',
                message: "Please select from one of the following:  ",
                choices: [
                    { name: 'Maintain Employees' },
                    { name: 'Maintain Roles' },
                    { name: 'Maintain Departments' },
                    { name: 'View Reports' },
                    { name: 'Exit Program' },
                ]
            }
        ]
        return questionArray
    },
    empMenuQuestions: function () {
        let questionArray = [
            {
                type: 'list',
                name: 'empMenuSelection',
                message: 'Please choose an action:  ',
                choices: [
                    { name: 'Add a New Employee' },
                    { name: 'Update an Existing Employee' },
                    { name: "Remove an Employee" },
                    { name: "Return to Main Menu" },

                ]
            }
        ]
        return questionArray
    },
    empAdd: function () {
        db.find_emp_array()
            .then(([rows]) => {
                let emp = rows;
                empArray = []
                for (var i = 0; i < emp.length; i++) {
                    empArray.push({ name: emp[i].first_name + " " + emp[i].last_name, value: emp[i].id })
                }
            })
            .then(results => {
                db.find_role_array()
                    .then(([rows]) => {
                        let role = rows
                        roleArray = []
                        for (var r = 0; r < role.length; r++) {
                            roleArray.push({ name: role[r].title, value: role[r].id })
                        }
                    })
                    .then(results => {
                        console.log(empArray)
                        console.log(roleArray)
                        let questionArray = [
                            {
                                type: 'input',
                                message: 'Please enter a first name:  ',
                                name: 'empAddFirstName'
                            },
                            {
                                type: 'input',
                                message: 'Please enter a last name:  ',
                                name: 'empAddLastName'
                            },
                            {
                                type: 'list',
                                message: 'Please select a role:  ',
                                name: 'empAddRole',
                                choices: roleArray
                            },
                            {
                                type: 'checkbox',
                                message: 'Please select a Manager:  ',
                                name: 'empAddManager',
                                choices: empArray
                            },
                        ]
                        return inquirer.prompt(questionArray)
                    })
                    .then(emp => {
                        db.addEmployee(emp.empAddFirstName,emp.empAddLastName, emp.empAddRole, emp.empAddManager)
                        .then(results => {
                            console.log("help")
                            // subEmployee();
                            console.log("halp2")
                        })
                    })
            })
    },
    empUpdate: function () {

    },
    empDelete: function () {

    },
    roleMenuQuestions: function () {
        let questionArray = [
            {
                type: 'list',
                name: 'roleMenuSelection',
                message: 'Please choose an action:  ',
                choices: [
                    { name: 'Add a New Role' },
                    { name: 'Update an Existing Role' },
                    { name: "Remove a Role" },
                    { name: "Return to Main Menu" },

                ]
            }
        ]
        return questionArray
    },
    deptMenuQuestions: function () {
        let questionArray = [
            {
                type: 'list',
                name: 'deptMenuSelection',
                message: 'Please choose an action:  ',
                choices: [
                    { name: 'Add a New Department' },
                    { name: 'Update an Existing Department' },
                    { name: "Remove a Department" },
                    { name: "Return to Main Menu" },

                ]
            }
        ]
        return questionArray
    },
    reportMenuQuestions: function () {
        let questionArray = [
            {
                type: 'list',
                name: 'reportMenuSelection',
                message: 'Please choose a report to view:  ',
                choices: [
                    { name: 'report 1' },
                    { name: 'report 2' },
                    { name: "report 3" },
                    { name: "Return to Main Menu" },

                ]
            }
        ]
        return questionArray
    }
}

module.exports = inqData