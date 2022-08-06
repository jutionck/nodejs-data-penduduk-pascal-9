const DistrictService = require('../../service/district.service');
const DistrictRepository = require('../../repository/district.repository');
const Config = require('../../config/config');
const Response = require('../../utils/response');

const DistrictController = () => {
    const districtService = DistrictService(DistrictRepository(Config));
    const createDistrict = async (req, res, payload) => {
        try {
            const result = await districtService.create(payload);
            if (!result.id) {
                res.end(JSON.stringify(Response().error('XX', result)));
            } else {
                res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
            }
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const findAllDistrict = async (req, res) => {
        try {
            const result = await districtService.findAll();
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const getDistrict = async (req, res, id) => {
        try {
            const result = await districtService.findById(id);
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const updateDistrict = async (req, res, payload) => {
        try {
            const result = await districtService.updateData(payload);
            if (!result.id) {
                res.end(JSON.stringify(Response().error('XX', result)));
            } else {
                res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
            }
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    const deleteDistrict = async (req, res, id) => {
        try {
            const result = await districtService.deleteData(id);
            res.end(JSON.stringify(Response().success(res.statusCode, 'SUCCESS', result)));
        } catch (err) {
            res.end(JSON.stringify(Response().error(res.statusCode === '400', err.message)));
        }
    }

    return {
        createDistrict, findAllDistrict, getDistrict, updateDistrict, deleteDistrict
    }
}

module.exports = DistrictController;

