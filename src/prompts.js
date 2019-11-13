const licenses = require('./licenses.js');

module.exports = {
    name: {
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
    },

    example: {
        type: 'confirm',
        name: 'rest',
        default: false,
        message: 'Should we include a User endpoint example?'
    },

    logger: {
        type: 'list',
        name: 'logger',
        default: 'morgan',
        message: 'Which logger would you like to use?',
        choices: ['morgan', 'voleyball'],
        filter: function (val) {
            return val.toLowerCase();
        }
    },

    database: {
        type: 'list',
        name: 'database',
        default: 'MySQL (No Sequelize)',
        message: 'Which database engine would you like to use?',
        choices: ['MySQL (No Sequelize)', 'MongoDb', 'MySQL', 'MariaDB', 'Postgres', 'MSSQL'],
        filter: function (val) {
            return val.toLowerCase();
        }
    },

    typescript: {
        type: 'confirm',
        name: 'ts',
        default: false,
        message: 'Would you like to use Typescript?'
    },

    aliases: {
        type: 'confirm',
        name: 'aliases',
        default: false,
        message: 'Would you like to use Aliases?'
    },

    license: {
        type: 'list',
        name: 'license',
        default: 'UNLICENSED',
        message: 'Which license would you like to use?',
        choices: licenses
    },

    port: {
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
    }
}