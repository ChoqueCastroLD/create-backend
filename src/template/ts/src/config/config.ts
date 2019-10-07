// Export Config
export default {
    database: {
        host     : process.env.DB_HOST || '127.0.0.1',
        database : process.env.DB_DATABASE || 'exampleDatabase',
        user     : process.env.DB_USER || 'admin',
        password : process.env.DB_PASSWORD || '12345',
        <% if(database !== 'mysql (no sequelize)') { %>
        <% if(database === 'sqlite') { %>
        storage  : process.env.DB_STORAGE || 'path/to/database.sqlite',
        <% } %>
        engine   : '<%= database || "mysql" %>',
        <% } %>
        connectionLimit: process.env.DB_POOL || 10
    },
    app: {
        port     : process.env.PORT || <%= port || 3000 %>,
        <% if(logger === 'morgan') { %>
        logFormat  : 'dev', // dev | combined | common | short | tiny
        <% } %>
        secretKey: process.env.SECRET_KEY || 'yourSecretKey'
    }
}