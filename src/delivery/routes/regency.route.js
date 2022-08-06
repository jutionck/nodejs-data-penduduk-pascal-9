const Routes = require('../../utils/app.routes');
const RegencyController = require('../controller/regency.controller');

const RegencyRoute = (request, response) => {
    const url = request.url.split('/');
    if (request.url === `/${Routes().POST_REGENCY}` && request.method === 'POST') {
        request.addListener('data', (data) => {
            const payload = JSON.parse(data);
            RegencyController().createRegency(request, response, payload).catch();
        });
    } else if (request.url === `/${Routes().GET_REGENCY_LIST}` && request.method === 'GET') {
        RegencyController().findAllRegency(request, response).catch();
    } else if (`/${url[1]}` === '/regency' && url[2] && request.method === 'GET') {
        RegencyController().getRegency(request, response, url[2]).catch();
    } else if (request.url === `/${Routes().PUT_REGENCY}` && request.method === 'PUT') {
        request.addListener('data', (data) => {
            const payload = JSON.parse(data);
            RegencyController().updateRegency(request, response, payload).catch();
        });
    } else if (`/${url[1]}` === '/regency' && url[2] && request.method === 'DELETE') {
        RegencyController().deleteRegency(request, response, url[2]).catch();
    }
}

module.exports = RegencyRoute;
