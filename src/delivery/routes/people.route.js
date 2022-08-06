const Routes = require('../../utils/app.routes');
const PeopleController = require('../controller/people.controller');

const PeopleRoute = (request, response) => {
    const url = request.url.split('/');
    if (request.url === `/${Routes().POST_PEOPLE}` && request.method === 'POST') {
        request.addListener('data', (data) => {
            const payload = JSON.parse(data);
            PeopleController().registerPeople(request, response, payload).catch();
        });
    } else if (request.url === `/${Routes().GET_PEOPLE_LIST}` && request.method === 'GET') {
        PeopleController().findAllPeople(request, response).catch();
    } else if (`/${url[1]}/${url[2]}` === '/people/nik' && url[3] && request.method === 'GET') {
        PeopleController().getPersonByNik(request, response, url[3]).catch();
    } else if (`/${url[1]}` === '/people' && url[2] && request.method === 'GET') {
        PeopleController().getPerson(request, response, url[2]).catch();
    } else if (`/${url[1]}` === '/people' && url[2] && request.method === 'DELETE') {
        PeopleController().deletePerson(request, response, url[2]).catch();
    }
}

module.exports = PeopleRoute;
