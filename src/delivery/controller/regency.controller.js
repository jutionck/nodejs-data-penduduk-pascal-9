const RegencyService = require('../../service/regency.service');
const RegencyRepository = require('../../repository/regency.repository');
const Config = require('../../config/config');
const Response = require('../../utils/response');

const RegencyController = () => {
    const regencyService = RegencyService(RegencyRepository(Config));
    const createRegency = async (req, res, payload) => {
        try {
            const result = await regencyService.create(payload);
            if (!result.id) {
                res.end(JSON.stringify(Response().error('XX', result)));
            } else {
                res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
            }
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const findAllRegency = async (req, res) => {
        try {
            const result = await regencyService.findAll();
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const getRegency = async (req, res, id) => {
        try {
            const result = await regencyService.findById(id);
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const updateRegency = async (req, res, payload) => {
        try {
            const result = await regencyService.updateData(payload);
            if (!result.id) {
                res.end(JSON.stringify(Response().error('XX', result)));
            } else {
                res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
            }
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const deleteRegency = async (req, res, id) => {
        try {
            const result = await regencyService.deleteData(id);
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    return {
        createRegency, findAllRegency, getRegency, updateRegency, deleteRegency
    }
}

module.exports = RegencyController;

