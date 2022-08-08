const {
    CREATE_REGENCY,
    READ_BY_ID_REGENCY,
    READ_BY_NAME_REGENCY,
    UPDATE_REGENCY,
    READ_ALL_REGENCY,
    DELETE_REGENCY} = require('../utils/query');
const ProvinceService = require('../service/province.service');
const Config = require('../config/config');
const ProvinceRepository = require("./province.repository");
const RegencyDto = require('../model/dto/regency.dto');

const RegencyRepository = (db) => {
    const add = async (newRegency) => {
        try {
            const err = await isRegencyNameExists(newRegency.name);
            if (err) {
                return err
            }
            const newDate = new Date();
            const result = await db.query(CREATE_REGENCY, [newRegency.id,newRegency.name,newRegency.provinceId, newDate]);
            const provinceOfAdd = await isProvinceExist(result.rows[0].province_id);
            if (provinceOfAdd) {
                return RegencyDto().createUpdate(result, provinceOfAdd);
            }
        } catch (err) {
            return err.message
        }
    }

    const list = async () => {
        try {
            const result = await db.query(READ_ALL_REGENCY);
            const regencies = [];
            for (let i = 0;i < result.rows.length; i++) {
                regencies.push(RegencyDto().getList(result, i));
            }
            return regencies;
        } catch (err) {
            return err.message
        }
    }

    const get = async (id) => {
        try {
            const result = await db.query(READ_BY_ID_REGENCY, [id]);
            if (result.rows.length === 0) {
                return `ID with ${id} not found`;
            }
            return RegencyDto().getList(result, 0);
        } catch (err) {
            return err.message
        }
    }

    const update = async (updateRegency) => {
        try {
            const isIdExist = await isRegencyCodeExists(updateRegency.id);
            if (isIdExist) {
                return isIdExist;
            }
            const newDate = new Date();
            const result = await db.query(UPDATE_REGENCY, [updateRegency.name, updateRegency.provinceId, newDate, updateRegency.id]);
            const provinceOfUpdate = await isProvinceExist(result.rows[0].province_id);
            if (provinceOfUpdate) {
                return RegencyDto().createUpdate(result, provinceOfUpdate);
            }
        } catch (err) {
            return err.message
        }
    }

    const remove = async (id) => {
        try {
            const isIdExist = await isRegencyCodeExists(id);
            if (isIdExist) {
                return isIdExist;
            }
            await db.query(DELETE_REGENCY, [id]);
            return `Regency with ID ${id} deleted success`;
        } catch (err) {
            return err.message
        }
    }

    const isRegencyNameExists = async (name) => {
        const result = await db.query(READ_BY_NAME_REGENCY, [name]);
        if (result.rows.length > 0) {
            return `Regency name with value ${name} already exist`;
        }
    }

    const isRegencyCodeExists = async (id) => {
        const result = await db.query(READ_BY_ID_REGENCY, [id]);
        if (result.rows.length === 0) {
            return `Regency ID with value ${id} not found`;
        }
    }

    const isProvinceExist = async (id) => {
        const provinceService = ProvinceService(ProvinceRepository(Config));
        return await provinceService.findById(id);
    }

    return {
        add, list, get, update, remove
    }
}

module.exports = RegencyRepository;
