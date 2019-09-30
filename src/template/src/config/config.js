// Export Config
module.exports = {
    mysql: {
        host     : '127.0.0.1',
        database : 'exampleDatabase',
        connectionLimit: 10,
        user     : 'admin',
        password : '12345',
    },
    externalKeys: {
        // google   : process.env.GOOGLE_API_KEY || 'myGoogleAPIkey',
        // youtube  : process.env.YOUTUBE_API_KEY || 'myYoutubeAPIkey'
    },
    app: {
        port     : process.env.PORT || <%= port %>,
        logFormat  : 'dev', // dev | combined | common | short | tiny
        secretKey: process.env.SECRET_KEY || 'yourSecretKey'
    }
}