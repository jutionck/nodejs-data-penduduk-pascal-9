const http = require('http');
const Routes = require('./index');
const port = 8181;

const Server = () => {
    const run = () => {
        const server = http.createServer((request, response) => {
            response.setHeader('Content-Type', 'application/json');
            Routes(request, response);
        });

        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    }

    return { run }
}

module.exports = Server;
