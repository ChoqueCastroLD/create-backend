const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

module.exports = {
    async generate(options = {}){
        // options > name & database & sockets & rest        
        let getOutput = (somePath = '') => `./${options.name}/${somePath}`;
        let getTemplate = (somePath = '') => path.resolve(__dirname, `./template/${somePath}`);


        let renderFile = (path, data) => {
            ejs.renderFile(getTemplate(path), data,(err, str) => {
                if(err) throw err;
                fs.writeFileSync(getOutput(path), str);
            })
        }


        // Generate folder structure
        fs.mkdirSync(getOutput(`/src`), { recursive: true });
        fs.mkdirSync(getOutput(`/src/config`), { recursive: true });
        fs.mkdirSync(getOutput(`/src/controller`), { recursive: true });
        fs.mkdirSync(getOutput(`/src/model`), { recursive: true });
        fs.mkdirSync(getOutput(`/src/routes`), { recursive: true });

        // Generate package.json
        renderFile('package.json', options);

        // Generate server index
        renderFile('src/server.js', options);

        // Generate config
        renderFile('src/config/config.js', options);
        
        // Generate database model
        renderFile('src/model/database.js', options);

        renderFile('src/routes/router.js', options);

        if(options.rest){
            renderFile('src/model/userModel.js', options);
            renderFile('src/controller/userController.js', options);
            renderFile('src/routes/userRoutes.js', options);
        }
        

        console.log(`done ;)

        What's next?
        1. Go to your project folder
        cd ${getOutput('')}

        2. Install dependencies (node_modules)
        npm install

        3. Try it!
        npm start
        `);
        
    }
}