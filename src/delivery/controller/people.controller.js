const PeopleService = require('../../service/people.service');
const PeopleRepository = require('../../repository/people.repository');
const Config = require('../../config/config');
const Response = require('../../utils/response');

const PeopleController = () => {
    const peopleService = PeopleService(PeopleRepository(Config));
    const registerPeople = async (req, res, payload) => {
        try {
            const result = await peopleService.create(payload);
            if (!result.id) {
                res.end(JSON.stringify(Response().error('XX', result)));
            } else {
                res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
            }
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const findAllPeople = async (req, res) => {
        try {
            const result = await peopleService.findAll();
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const getPerson = async (req, res, id) => {
        try {
            const result = await peopleService.findById(id);
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const getPersonByNik = async (req, res, nik) => {
        try {
            const result = await peopleService.findByNik(nik);
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const deletePerson = async (req, res, id) => {
        try {
            const result = await peopleService.deleteData(id);
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    return {
        registerPeople, getPerson, getPersonByNik, findAllPeople, deletePerson
    }
}

module.exports = PeopleController;

