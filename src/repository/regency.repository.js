const {
    CREATE_REGENCY,
    READ_BY_ID_REGENCY,
    READ_BY_NAME_REGENCY,
    UPDATE_REGENCY,
    READ_ALL_REGENCY,
    DELETE_REGENCY} = require('../utils/query');
const ProvinceService = require("../service/province.service");
const Config = require("../config/config");
const ProvinceRepository = require("./province.repository");

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
                const regency = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    province: {
                      id: provinceOfAdd.id,
                      name: provinceOfAdd.name,
                      createdAt: provinceOfAdd.createdAt,
                      updatedAt: provinceOfAdd.updatedAt,
                    },
                    createdAt: result.rows[0].created_at,
                    updatedAt: result.rows[0].updated_at,
                }
                return regency;
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
                regencies.push({
                    id: result.rows[i].id,
                    name: result.rows[i].name,
                    province: {
                        id: result.rows[i].provinceid,
                        name: result.rows[i].provincename,
                        createdAt: result.rows[i].createdat,
                        updatedAt: result.rows[i].updatedat,
                    },
                    createdAt: result.rows[i].created_at,
                    updatedAt: result.rows[i].updated_at,
                });
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
            const regency = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                province: {
                    id: result.rows[0].provinceid,
                    name: result.rows[0].provincename,
                    createdAt: result.rows[0].createdat,
                    updatedAt: result.rows[0].updatedat,
                },
                createdAt: result.rows[0].created_at,
                updatedAt: result.rows[0].updated_at,
            }
            return regency;
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
                const regency = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    province: {
                        id: provinceOfUpdate.id,
                        name: provinceOfUpdate.name,
                        createdAt: provinceOfUpdate.createdAt,
                        updatedAt: provinceOfUpdate.updatedAt,
                    },
                    createdAt: result.rows[0].created_at,
                    updatedAt: result.rows[0].updated_at,
                }
                return regency;
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
