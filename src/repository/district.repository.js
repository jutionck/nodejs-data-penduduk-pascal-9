const {
    CREATE_DISTRICT,
    READ_BY_ID_DISTRICT,
    READ_BY_NAME_DISTRICT,
    UPDATE_DISTRICT,
    READ_ALL_DISTRICT,
    DELETE_DISTRICT} = require('../utils/query');
const RegencyService = require('../service/regency.service');
const ProvinceService = require('../service/province.service');
const Config = require('../config/config');
const RegencyRepository = require('./regency.repository');
const ProvinceRepository = require('./province.repository');
const DistrictDto = require('../model/dto/district.dto');

const DistrictRepository = (db) => {
    const add = async (newDistrict) => {
        try {
            const err = await isDistrictNameExists(newDistrict.name);
            if (err) {
                return err
            }
            const newDate = new Date();
            const result = await db.query(CREATE_DISTRICT, [newDistrict.id,newDistrict.name,newDistrict.regencyId, newDate]);
            const regencyOfAdd = await isRegencyExist(result.rows[0].regency_id);
            const provOfAdd = await isProvinceExist(regencyOfAdd.province.id);
            if (regencyOfAdd) {
                return DistrictDto().createUpdate(result, regencyOfAdd, provOfAdd);
            }
        } catch (err) {
            return err.message
        }
    }

    const list = async () => {
        try {
            const result = await db.query(READ_ALL_DISTRICT);
            const districts = [];
            for (let i = 0;i < result.rows.length; i++) {
                districts.push(DistrictDto().getList(result, i));
            }
            return districts;
        } catch (err) {
            return err.message
        }
    }

    const get = async (id) => {
        try {
            const result = await db.query(READ_BY_ID_DISTRICT, [id]);
            if (result.rows.length === 0) {
                return `ID with ${id} not found`;
            }
            return DistrictDto().getList(result, 0);
        } catch (err) {
            return err.message
        }
    }

    const update = async (updateDistrict) => {
        try {
            const isIdExist = await isDistrictCodeExists(updateDistrict.id);
            if (isIdExist) {
                return isIdExist;
            }
            const newDate = new Date();
            const result = await db.query(UPDATE_DISTRICT, [updateDistrict.name, updateDistrict.regencyId, newDate, updateDistrict.id]);
            const regencyOfUpdate= await isRegencyExist(result.rows[0].regency_id);
            const provOfAdd = await isProvinceExist(regencyOfUpdate.province.id);
            if (regencyOfUpdate) {
                return DistrictDto().createUpdate(result, regencyOfUpdate, provOfAdd);;
            }
        } catch (err) {
            return err.message
        }
    }

    const remove = async (id) => {
        try {
            const isIdExist = await isDistrictCodeExists(id);
            if (isIdExist) {
                return isIdExist;
            }
            await db.query(DELETE_DISTRICT, [id]);
            return `District with ID ${id} deleted success`;
        } catch (err) {
            return err.message
        }
    }

    const isDistrictNameExists = async (name) => {
        const result = await db.query(READ_BY_NAME_DISTRICT, [name]);
        if (result.rows.length > 0) {
            return `District name with value ${name} already exist`;
        }
    }

    const isDistrictCodeExists = async (id) => {
        const result = await db.query(READ_BY_ID_DISTRICT, [id]);
        if (result.rows.length === 0) {
            return `District ID with value ${id} not found`;
        }
    }

    const isRegencyExist = async (id) => {
        const regencyService = RegencyService(RegencyRepository(Config));
        return await regencyService.findById(id);
    }

    const isProvinceExist = async (id) => {
        const provinceService = ProvinceService(ProvinceRepository(Config));
        return await provinceService.findById(id);
    }

    return {
        add, list, get, update, remove
    }
}

module.exports = DistrictRepository;
