// Export Config
module.exports = {
    database: {
        host     : process.env.DB_HOST || '127.0.0.1',
        database : process.env.DB_DATABASE || 'exampleDatabase',
        connectionLimit: process.env.DB_POOL || 10,
        user     : process.env.DB_USER || 'admin',
        password : process.env.DB_PASSWORD || '12345',
        <% if(database === 'sqlite') { %>
        storage  : process.env.DB_STORAGE || 'path/to/database.sqlite',
        <% } %>
        engine   : '<%= database || "mysql" %>'
    },
    externalKeys: {
        // google   : process.env.GOOGLE_API_KEY || 'myGoogleAPIkey',
        // youtube  : process.env.YOUTUBE_API_KEY || 'myYoutubeAPIkey'
    },
    app: {
        port     : process.env.PORT || <%= port || 3000 %>,
        logFormat  : 'dev', // dev | combined | common | short | tiny
        secretKey: process.env.SECRET_KEY || 'yourSecretKey'
    }
}