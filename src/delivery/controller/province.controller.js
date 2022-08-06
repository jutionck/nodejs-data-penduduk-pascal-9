const ProvinceService = require('../../service/province.service');
const ProvinceRepository = require('../../repository/province.repository');
const Config = require('../../config/config');
const Response = require('../../utils/response');

const ProvinceController = () => {
    const provinceService = ProvinceService(ProvinceRepository(Config));
    const createProvince = async (req, res, payload) => {
        try {
            const result = await provinceService.create(payload);
            if (!result.id) {
                res.end(JSON.stringify(Response().error('XX', result)));
            } else {
                res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
            }
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const findAllProvince = async (req, res) => {
        try {
            const result = await provinceService.findAll();
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const getProvince = async (req, res, id) => {
        try {
            const result = await provinceService.findById(id);
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const updateProvince = async (req, res, payload) => {
        try {
            const result = await provinceService.updateData(payload);
            if (!result.id) {
                res.end(JSON.stringify(Response().error('XX', result)));
            } else {
                res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
            }
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const deleteProvince = async (req, res, id) => {
        try {
            const result = await provinceService.deleteData(id);
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    return {
        createProvince, findAllProvince, getProvince, updateProvince, deleteProvince
    }
}

module.exports = ProvinceController;

