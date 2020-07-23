export const environment = {
    server: {
        port: process.env.SERVER_PORT || 3000,
        baseUrl: 'http://localhost:3000'
    },
    db: { url: process.env.DB_URL || 'mongodb://localhost/data-player' },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        secretToken : process.env.SECRET_TOKEN || 'cf8ba5c1301a1529e819ceb32b1fcf8c'
    }
}