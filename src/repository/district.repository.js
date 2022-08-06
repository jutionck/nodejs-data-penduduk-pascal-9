const {
    CREATE_DISTRICT,
    READ_BY_ID_DISTRICT,
    READ_BY_NAME_DISTRICT,
    UPDATE_DISTRICT,
    READ_ALL_DISTRICT,
    DELETE_DISTRICT} = require('../utils/query');
const RegencyService = require("../service/regency.service");
const ProvinceService = require("../service/province.service");
const Config = require("../config/config");
const RegencyRepository = require("./regency.repository");
const ProvinceRepository = require("./province.repository");

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
                const regency = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    regency: {
                        id: regencyOfAdd.id,
                        name: regencyOfAdd.name,
                        province: {
                            id: provOfAdd.id,
                            name: provOfAdd.name,
                            createdAt: provOfAdd.createdAt,
                            updatedAt: provOfAdd.updatedAt,
                        },
                        createdAt: regencyOfAdd.createdAt,
                        updatedAt: regencyOfAdd.updatedAt,
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
            const result = await db.query(READ_ALL_DISTRICT);
            const districts = [];
            for (let i = 0;i < result.rows.length; i++) {
                districts.push({
                    id: result.rows[i].id,
                    name: result.rows[i].name,
                    regency: {
                        id: result.rows[i].regencyid,
                        name: result.rows[i].regencyname,
                        province: {
                            id: result.rows[i].provinceid,
                            name: result.rows[i].provincename,
                            createdAt: result.rows[i].pcreatedat,
                            updatedAt: result.rows[i].pupdatedat,
                        },
                        createdAt: result.rows[i].createdat,
                        updatedAt: result.rows[i].updatedat,
                    },
                    createdAt: result.rows[i].created_at,
                    updatedAt: result.rows[i].updated_at,
                });
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
            const regency = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                regency: {
                    id: result.rows[0].regencyid,
                    name: result.rows[0].regencyname,
                    province: {
                        id: result.rows[0].provinceid,
                        name: result.rows[0].provincename,
                        createdAt: result.rows[0].pcreatedat,
                        updatedAt: result.rows[0].pupdatedat,
                    },
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
                const regency = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    regency: {
                        id: regencyOfUpdate.id,
                        name: regencyOfUpdate.name,
                        province: {
                            id: provOfAdd.id,
                            name: provOfAdd.name,
                            createdAt: provOfAdd.createdAt,
                            updatedAt: provOfAdd.updatedAt,
                        },
                        createdAt: regencyOfUpdate.createdAt,
                        updatedAt: regencyOfUpdate.updatedAt,
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
