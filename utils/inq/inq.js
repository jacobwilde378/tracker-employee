const db = require("../../db/arrayQueries");
const inquirer = require('inquirer')
// const cTable = require('console.table')

let empArray = []
let roleArray = []
let deptArray = []



const inqData = {
    questions: {
        main_menu: function () {
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
        emp_menu: function () {
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
        role_menu: function () {
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
        dept_menu: function () {
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
        report_menu: function () {
            let questionArray = [
                {
                    type: 'list',
                    name: 'reportMenuSelection',
                    message: 'Please choose a report to view:  ',
                    choices: [
                        { name: 'View All Employees' },
                        { name: 'View All Roles' },
                        { name: 'View All Departments' },
                        { name: 'Return to Main Menu' },

                    ]
                }
            ]
            return questionArray
        },

    },
    menus: {
        mainMenu: function () {
            console.clear()
            return inquirer.prompt(inqData.questions.main_menu())
                .then(mainMenuData => {
                    switch (mainMenuData.mainMenuSelection) {
                        case 'Maintain Employees':
                            inqData.menus.employeeMenu()
                            break
                        case 'Maintain Roles':
                            inqData.menus.roleMenu()
                            break
                        case 'Maintain Departments':
                            inqData.menus.deptMenu()
                            break
                        case 'View Reports':
                            inqData.menus.reportMenu()
                            break
                        case 'Exit Program':
                            process.exit()
                    }
                })
        },
        employeeMenu: function () {
            console.clear()
            return inquirer.prompt(inqData.questions.emp_menu())
                .then(empMenuData => {
                    switch (empMenuData.empMenuSelection) {
                        case 'Add a New Employee':
                            return inqData.emp_functions.Add();
                        case 'Update an Existing Employee':
                            return inqData.emp_functions.Update()
                        case 'Remove an Employee':
                            return inqData.emp_functions.Delete()
                        case 'Return to Main Menu':
                            return inqData.menus.mainMenu()
                    }
                })
        },
        roleMenu: function () {
            console.clear()
            return inquirer.prompt(inqData.questions.role_menu())
                .then(roleMenuData => {
                    switch (roleMenuData.roleMenuSelection) {
                        case 'Add a New Role':
                            return inqData.role_functions.Add();
                        case 'Update an Existing Role':
                            return inqData.role_functions.Update();
                        case 'Remove a Role':
                            return inqData.role_functions.Delete();
                        case 'Return to Main Menu':
                            return inqData.menus.mainMenu()
                    }
                })


        },
        deptMenu: function () {
            console.clear()
            return inquirer.prompt(inqData.questions.dept_menu())
                .then(deptMenuData => {
                    switch (deptMenuData.deptMenuSelection) {
                        case 'Add a New Department':
                            return inqData.dept_functions.Add();
                        case 'Update an Existing Department':
                            return inqData.dept_functions.Update();
                        case 'Remove a Department':
                            return inqData.dept_functions.Delete();
                        case 'Return to Main Menu':
                            return inqData.menus.mainMenu()
                    }
                })
        },

        umActually: function () {
            console.clear()
            return inquirer.prompt(inqData.questions.dept_menu())
                .then(deptMenuData => {
                    switch (deptMenuData.deptMenuSelection) {
                        case 'Add a New Department':
                            return inqData.dept_functions.Add();
                        case 'Update an Existing Department':
                            return inqData.dept_functions.Update();
                        case 'Remove a Department':
                            return inqData.dept_functions.Delete();
                        case 'Return to Main Menu':
                            return inqData.menus.mainMenu()
                    }
                })
        },
        reportMenu: function () {
            return inquirer.prompt(inqData.questions.report_menu())
                .then(reportMenuData => {
                    switch (reportMenuData.reportMenuSelection) {
                        case 'View All Employees':
                            return inqData.report_function.Employee()
                        case 'View All Roles':
                            return inqData.report_function.Role()
                        case 'View All Departments':
                            return inqData.report_function.Department()
                        case 'Return to Main Menu':
                            return inqData.menus.mainMenu()
                    }
                })

        },
    },
    emp_functions: {
        Add: function () {
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
                            db.addEmployee(emp.empAddFirstName, emp.empAddLastName, emp.empAddRole, emp.empAddManager)
                                .then(results => {
                                    inqData.menus.employeeMenu()
                                })
                        })
                })
        },
        Update: function () {
            db.find_emp_array()
                .then(([rows]) => {
                    let emp = rows;
                    empArray = []
                    for (var i = 0; i < emp.length; i++) {
                        empArray.push({ name: emp[i].first_name + " " + emp[i].last_name, value: emp[i].id })
                    }

                })
                .then(() => {
                    db.find_role_array()
                        .then(([rows]) => {
                            let role = rows
                            roleArray = []
                            for (var r = 0; r < role.length; r++) {
                                roleArray.push({ name: role[r].title, value: role[r].id })
                            }
                        })
                })
                .then(() => {
                    return inquirer.prompt([
                        {
                            type: 'checkbox',
                            message: 'Please select an Employee to Update',
                            name: 'empUpdateSelection',
                            choices: empArray
                        }
                    ])
                        .then(sel => {
                            if (sel.empUpdateSelection.length === 0) {
                                return inqData.menus.employeeMenu()
                            }
                            db.find_one_emp(sel.empUpdateSelection)
                                .then(([rows]) => {
                                    let emp = rows
                                    let questionArray = [
                                        {
                                            type: 'input',
                                            message: 'Please enter a first name:  ',
                                            name: 'empUpdateFirstName',
                                            default: emp[0].first_name
                                        },
                                        {
                                            type: 'input',
                                            message: 'Please enter a last name:  ',
                                            name: 'empUpdateLastName',
                                            default: emp[0].last_name
                                        },
                                        {
                                            type: 'list',
                                            message: 'Please select a role:  ',
                                            name: 'empUpdateRole',
                                            choices: roleArray,
                                        },
                                        {
                                            type: 'checkbox',
                                            message: 'Please select a Manager:  ',
                                            name: 'empUpdateManager',
                                            choices: empArray,
                                        },
                                    ]
                                    return inquirer.prompt(questionArray)
                                        .then(data => {
                                            let id = sel.empUpdateSelection
                                            db.updateEmployee(id, data.empUpdateFirstName, data.empUpdateLastName, data.empUpdateRole, data.empUpdateManager)
                                                .then(() => {
                                                    inqData.menus.employeeMenu()
                                                })

                                        })
                                })
                        })

                })

        },
        Delete: function () {
            db.find_emp_array()
                .then(([rows]) => {
                    let emp = rows;
                    empArray = []
                    for (var i = 0; i < emp.length; i++) {
                        empArray.push({ name: emp[i].first_name + " " + emp[i].last_name, value: emp[i].id })
                    }
                })
                .then(() => {
                    return inquirer.prompt([
                        {
                            type: "checkbox",
                            name: "empDeleteSelection",
                            message: "Please select a user to remove",
                            choices: empArray
                        }
                    ])
                        .then(selection => {
                            db.deleteEmployee(selection.empDeleteSelection)
                                .then(() => {
                                    inqData.menus.employeeMenu()
                                })
                        })
                })
        }
    },
    role_functions: {
        Add: function () {
            db.find_dept_array()
                .then(([rows]) => {
                    let dept = rows;
                    deptArray = []
                    for (var i = 0; i < dept.length; i++) {
                        deptArray.push({ name: dept[i].name, value: dept[i].id })
                    }

                })
                .then(() => {
                    return inquirer.prompt([
                        {
                            type: "input",
                            message: "Please enter a title",
                            name: "roleAddTitle"
                        },
                        {
                            type: "input",
                            message: "Please enter a salary (###.##)",
                            name: "roleAddSalary"
                        },
                        {
                            type: "list",
                            message: "Please select a department",
                            name: "roleAddDeptId",
                            choices: deptArray
                        }
                    ])
                        .then(data => {
                            db.addRole(data.roleAddTitle, data.roleAddSalary, data.roleAddDeptId)
                                .then(() => {
                                    inqData.menus.roleMenu()
                                })
                        })
                })

        },
        Update: function () {
            db.find_role_array()
                .then(([rows]) => {
                    let role = rows
                    roleArray = []
                    for (var i = 0; i < role.length; i++) {
                        roleArray.push({ name: role[i].title, value: role[i].id })
                    }
                })
                .then(() => {
                    db.find_dept_array()
                        .then(([rows]) => {
                            let dept = rows;
                            deptArray = []
                            for (var i = 0; i < dept.length; i++) {
                                deptArray.push({ name: dept[i].name, value: dept[i].id })
                            }
                        })
                        .then(() => {
                            return inquirer.prompt([
                                {
                                    type: 'checkbox',
                                    name: "roleUpdateSelection",
                                    message: "Please select a role to update",
                                    choices: roleArray
                                }
                            ])
                        })
                        .then(selection => {
                            id = selection.roleUpdateSelection
                            db.find_one_role(id)
                                .then(([rows]) => {
                                    let role = rows
                                    return inquirer.prompt([
                                        {
                                            type: "input",
                                            name: "roleUpdateTitle",
                                            message: "please enter a title",
                                            default: role[0].title
                                        },
                                        {
                                            type: 'input',
                                            name: 'roleUpdateSalary',
                                            message: 'Please enter a salary (###.##)',
                                            default: role[0].salary
                                        },
                                        {
                                            type: 'list',
                                            name: 'roleUpdateDeptId',
                                            message: "Please select a department",
                                            choices: deptArray
                                        }

                                    ])
                                        .then(roleData => {
                                            db.updateRole(id, roleData.roleUpdateTitle, roleData.roleUpdateSalary, roleData.roleUpdateDeptId)
                                                .then(() => {
                                                    inqData.menus.roleMenu()
                                                })
                                        })
                                })
                        })
                })
        },
        Delete: function () {
            db.find_role_array()
                .then(([rows]) => {
                    let role = rows
                    roleArray = []
                    for (var i = 0; i < role.length; i++) {
                        roleArray.push({ name: role[i].title, value: role[i].id })
                    }
                })
                .then(() => {
                    return inquirer.prompt([
                        {
                            type: 'checkbox',
                            name: 'roleDeleteSelection',
                            message: 'Please select a role to remove',
                            choices: roleArray
                        }
                    ])
                        .then(selection => {
                            let id = selection.roleDeleteSelection
                            db.deleteRole(id)
                                .then(() => {
                                    inqData.menus.roleMenu()
                                })
                        })
                })

        }
    },
    dept_functions: {
        Add: function () {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'deptAddName',
                    message: 'Please enter a department name'
                }
            ])
                .then(data => {
                    db.addDept(data.deptAddName)
                        .then(() => {
                            inqData.menus.deptMenu()
                        })
                })
        },
        Update: function () {
            db.find_dept_array()
                .then(([rows]) => {
                    let dept = rows
                    deptArray = []
                    for (var i = 0; i < dept.length; i++) {
                        deptArray.push({ name: dept[i].name, value: dept[i].id })
                    }
                })
                .then(() => {
                    return inquirer.prompt([
                        {
                            type: 'checkbox',
                            name: 'deptUpdateSelection',
                            message: 'Please select a department to update',
                            choices: deptArray
                        }
                    ])
                        .then(data => {
                            let id = data.deptUpdateSelection
                            db.find_one_dept(id)
                                .then(([rows]) => {
                                    let dept = rows
                                    return inquirer.prompt([
                                        {
                                            type: 'input',
                                            name: 'deptUpdateName',
                                            message: 'Please enter a new department name',
                                            default: dept[0].name
                                        }
                                    ])
                                        .then(results => {
                                            db.updateDept(id, results.deptUpdateName)
                                                .then(() => {
                                                    inqData.menus.deptMenu()
                                                })
                                        })
                                })

                        })
                })

        },
        Delete: function () {
            db.find_dept_array()
                .then(([rows]) => {
                    let dept = rows
                    deptArray = []
                    for (var i = 0; i < dept.length; i++) {
                        deptArray.push({ name: dept[i].name, value: dept[i].id })
                    }
                })
                .then(() => {
                    return inquirer.prompt([
                        {
                            type: 'checkbox',
                            name: "deptDeleteSelection",
                            message: "Please select an option to be removed",
                            choices: deptArray
                        }
                    ])
                        .then(data => {
                            let id = data.deptDeleteSelection
                            db.deleteDept(id)
                                .then(() => {
                                    inqData.menus.deptMenu()
                                })
                        })
                })
        }

    },
    report_function: {
        Employee: function () {
            db.viewEmployee()
                .then(([rows]) => {
                    let results = rows
                    console.log('')
                    console.table(results)
                    return inquirer.prompt([
                        {
                            type: 'input',
                            name: 'return',
                            message: 'Please press return to when done.'
                        }
                    ])
                    .then(() => {
                        inqData.menus.reportMenu()
                    })
                })
        },
        Role: function () {
            db.viewRole()
                .then(([rows]) => {
                    let results = rows
                    console.log('')
                    console.table(results)
                    return inquirer.prompt([
                        {
                            type: 'input',
                            name: 'return',
                            message: 'Please press return to when done.'
                        }
                    ])
                    .then(() => {
                        inqData.menus.reportMenu()
                    })
                })
                
        },
        Department: function () {
            db.viewDept()
                .then(([rows]) => {
                    let results = rows
                    console.log('')
                    console.table(results)
                    return inquirer.prompt([
                        {
                            type: 'input',
                            name: 'return',
                            message: 'Please press return to when done.'
                        }
                    ])
                    .then(() => {
                        inqData.menus.reportMenu()
                    })
                })
        }
    }
}
module.exports = inqData