const http = require('http');
const Routes = require('./index');
const dotenv = require('dotenv');
const { APP_PORT } = process.env;

const Server = () => {
    dotenv.config()
    const run = () => {
        const server = http.createServer((request, response) => {
            response.setHeader('Content-Type', 'application/json');
            Routes(request, response);
        });

        server.listen(`${APP_PORT}`, () => {
            console.log(`Server running on port ${APP_PORT}`);
        })
    }

    return { run }
}

module.exports = Server;
