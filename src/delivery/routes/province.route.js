const Routes = require('../../utils/app.routes');
const ProvinceController = require('../controller/province.controller');

const ProvinceRoute = (request, response) => {
    const url = request.url.split('/');
    if (request.url === `/${Routes().POST_PROVINCE}` && request.method === 'POST') {
        request.addListener('data', (data) => {
            const payload = JSON.parse(data);
            ProvinceController().createProvince(request, response, payload).catch();
        });
    } else if (request.url === `/${Routes().GET_PROVINCE_LIST}` && request.method === 'GET') {
        ProvinceController().findAllProvince(request, response).catch();
    } else if (`/${url[1]}` === '/province' && url[2] && request.method === 'GET') {
        ProvinceController().getProvince(request, response, url[2]).catch();
    } else if (request.url === `/${Routes().PUT_PROVINCE}` && request.method === 'PUT') {
        request.addListener('data', (data) => {
            const payload = JSON.parse(data);
            ProvinceController().updateProvince(request, response, payload).catch();
        });
    } else if (`/${url[1]}` === '/province' && url[2] && request.method === 'DELETE') {
        ProvinceController().deleteProvince(request, response, url[2]).catch();
    }
}

module.exports = ProvinceRoute;
