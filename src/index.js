#!/usr/bin/env node

const inquirer = require('inquirer');
const gen = require('./generate.js');

let licenses = require('./licenses.js');

async function main() {
    console.log("What a beatiful day to write some beautiful code!\nLet's begin\n\n-github.com/ChoqueCastroLD");

    let answer = await inquirer.prompt([{
            type: 'input',
            name: 'name',
            default: 'generated_backend',
            message: "What's your project name ? (This will be the project folder)",
            validate: function (value) {
                let validarCaracteres = value.match(/^[_A-z0-9@]*((-|_)*[_A-z0-9@])*$/);

                if (validarCaracteres)
                    return true;

                return 'Please enter a valid project name';
            }
        }, {
            type: 'confirm',
            name: 'rest',
            default: 'Yes',
            message: 'Should we include a rest api example?'
        },
        {
            type: 'list',
            name: 'database',
            message: 'Which database engine would you like to use?',
            choices: ['MySQL'],
            filter: function (val) {
                return val.toLowerCase();
            }
        },
        {
            type: 'list',
            name: 'lang',
            message: 'Which programming language would you like to use?',
            choices: ['Javascript', 'Typescript'],
            filter: function (val) {
                return val.toLowerCase();
            }
        },
        {
            type: 'list',
            name: 'license',
            default: 'UNLICENSED',
            message: 'Which license would you like to use?',
            choices: licenses
        }, {
            type: 'input',
            name: 'port',
            message: "Which port will you use ?",
            default: '3000',
            validate: function (value) {
                let validarCaracteres = value.match(/[0-9]/);

                if (validarCaracteres)
                    return true;

                return 'Please enter a valid port';
            }
        },
    ]);

    let projectPath = await gen.generate(answer);

    console.log(`done ;)

    What's next?
    1. Go to your project folder
    cd ${projectPath}

    2. Install and Update node_modules
    npm run setup
    
    3. Try it!
    npm start
    `);
}

main();