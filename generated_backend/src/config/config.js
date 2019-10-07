// Export Config
module.exports = {
    database: {
        host     : process.env.DB_HOST || '127.0.0.1',
        database : process.env.DB_DATABASE || 'exampleDatabase',
        user     : process.env.DB_USER || 'admin',
        password : process.env.DB_PASSWORD || '12345',
        
        connectionLimit: process.env.DB_POOL || 10
    },
    app: {
        port     : process.env.PORT || 3000,
        
        logFormat  : 'dev', // dev | combined | common | short | tiny
        
        secretKey: process.env.SECRET_KEY || 'yourSecretKey'
    }
}