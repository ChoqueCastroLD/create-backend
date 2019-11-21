const path = require('path');
const fs = require('fs');
const ejs = require('ejs');


module.exports = {
    async generate(options = {}) {
        // options > name & database & sockets & rest        

        let lang = options.ts ? 'ts' : 'js';

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
        fs.mkdirSync(getOutput(``), opt);
        fs.mkdirSync(getOutput(`/src`), opt);
        fs.mkdirSync(getOutput(`/src/controllers`), opt);
        fs.mkdirSync(getOutput(`/src/models`), opt);
        fs.mkdirSync(getOutput(`/src/routes`), opt);
        
        try {
            // Generate .env
            renderFile(`.env`, options);
        } catch (error) {}
        
        // Generate readme
        renderFile(`README.md`, options);
        
        // Generate .gitignore
        renderFile(`.gitignore`, options);

        // Generate package.json
        renderFile(`package.json`, options);

        // Generate typescript config json
        if(lang === 'ts'){
            renderFile(`tsconfig.json`, options);
        }

        // Generate server index
        renderFile(`src/server.${lang}`, options);

        // Generate database model
        renderFile(`src/models/database.${lang}`, options);

        // Generate router
        renderFile(`src/routes/router.${lang}`, options);

        if (options.rest) {
            renderFile(`src/models/users.${lang}`, options);
            renderFile(`src/controllers/userController.${lang}`, options);
            renderFile(`src/routes/userRoutes.${lang}`, options);
        }

        return getOutput('');

    }
}