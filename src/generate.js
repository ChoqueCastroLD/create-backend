const path = require('path');
const fs = require('fs');
const ejs = require('ejs');


module.exports = {
    async generate(options = {}) {
        // options > name & database & sockets & rest        

        let lang = options.lang === 'typescript' ? 'ts' : 'js';

        let getOutput = (somePath = '') => `./${options.name}/${somePath}`;
        let getTemplate = (somePath = '') => path.resolve(__dirname, `./template/${lang}/${somePath}`);


        let renderFile = (path, data) => {
            ejs.renderFile(getTemplate(path), data, (err, str) => {
                if (err) throw err;
                fs.writeFileSync(getOutput(path), str);
            })
        }

        let opt = { recursive: true };

        // Generate folder structure
        fs.mkdirSync(getOutput(`/src`), opt);
        fs.mkdirSync(getOutput(`/src/config`), opt);
        fs.mkdirSync(getOutput(`/src/controller`), opt);
        fs.mkdirSync(getOutput(`/src/model`), opt);
        fs.mkdirSync(getOutput(`/src/routes`), opt);

        // Generate package.json
        renderFile(`package.json`, options);

        // Generate typescript config json
        if(lang === 'ts'){
            renderFile(`tsconfig.json`, options);
        }

        // Generate server index
        renderFile(`src/server.${lang}`, options);

        // Generate config
        renderFile(`src/config/config.${lang}`, options);

        // Generate database model
        renderFile(`src/model/database.${lang}`, options);

        // Generate router
        renderFile(`src/routes/router.${lang}`, options);

        if (options.rest) {
            renderFile(`src/model/userModel.${lang}`, options);
            renderFile(`src/controller/userController.${lang}`, options);
            renderFile(`src/routes/userRoutes.${lang}`, options);
        }

        return path.resolve(__dirname, getOutput(''));

    }
}