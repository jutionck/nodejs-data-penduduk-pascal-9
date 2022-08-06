const Routes = require('../../utils/app.routes');
const DistrictController = require('../controller/district.controller');

const DistrictRoute = (request, response) => {
    const url = request.url.split('/');
    if (request.url === `/${Routes().POST_DISTRICT}` && request.method === 'POST') {
        request.addListener('data', (data) => {
            const payload = JSON.parse(data);
            DistrictController().createDistrict(request, response, payload).catch();
        });
    } else if (request.url === `/${Routes().GET_DISTRICT_LIST}` && request.method === 'GET') {
        DistrictController().findAllDistrict(request, response).catch();
    } else if (`/${url[1]}` === '/district' && url[2] && request.method === 'GET') {
        DistrictController().getDistrict(request, response, url[2]).catch();
    } else if (request.url === `/${Routes().PUT_DISTRICT}` && request.method === 'PUT') {
        request.addListener('data', (data) => {
            const payload = JSON.parse(data);
            DistrictController().updateDistrict(request, response, payload).catch();
        });
    } else if (`/${url[1]}` === '/district' && url[2] && request.method === 'DELETE') {
        DistrictController().deleteDistrict(request, response, url[2]).catch();
    }
}

module.exports = DistrictRoute;
