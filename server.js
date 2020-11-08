let inquirer = require('inquirer');
let inqData = require('./utils/inq/inq');

sub_employee = function () {
    return inquirer.prompt(inqData.empMenuQuestions())
        .then(empMenuData => {
            switch (empMenuData.empMenuSelection) {
                case 'Add a New Employee':
                    return inqData.empAdd()
                case 'Update an Existing Employee':

                case 'Remove an Employee':

                case 'Return to Main Menu':
                    init();
            }
            return "yay"
        })
        .then(() => {
            init();
        })
}

let init = function () {
    return inquirer.prompt(inqData.mainMenuQuestions())
        .then(data => {
            switch (data.mainMenuSelection) {
                case 'Maintain Employees':
                    sub_employee();
                    break
                case 'Maintain Roles':
                    return inquirer.prompt(inqData.roleMenuQuestions())
                        .then(roleMenuData => {
                            switch (roleMenuData.roleMenuSelection) {
                                case 'Add a New Role':

                                case 'Update an Existing Role':

                                case 'Remove a Role':

                                case 'Return to Main Menu':
                                    init();
                            }
                        })

                case 'Maintain Departments':

                case 'View Reports':

                case 'Exit Program':
            }

        })

}

init();