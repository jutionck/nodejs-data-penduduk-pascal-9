const {
    CREATE_PROVINCE,
    READ_BY_ID_PROVINCE,
    READ_BY_NAME_PROVINCE,
    UPDATE_PROVINCE,
    READ_ALL_PROVINCE,
    DELETE_PROVINCE} = require('../utils/query');
const ProvinceDto = require("../model/dto/province.dto");

const ProvinceRepository = (db) => {
    const add = async (newProvince) => {
        try {
            const err = await isProvinceNameExists(newProvince.name);
            if (err) {
                return err
            }
            const newDate = new Date();
            const result = await db.query(CREATE_PROVINCE, [newProvince.id,newProvince.name,newDate]);
            return ProvinceDto().createUpdate(result, 0);
        } catch (err) {
            return err.message
        }
    }

    const list = async () => {
        try {
            const result = await db.query(READ_ALL_PROVINCE);
            const provinces = [];
            for (let i = 0;i < result.rows.length; i++) {
                provinces.push(ProvinceDto().getList(result, i));
            }
            return provinces;
        } catch (err) {
            return err.message
        }
    }

    const get = async (id) => {
        try {
            const result = await db.query(READ_BY_ID_PROVINCE, [id]);
            if (result.rows.length === 0) {
                return `ID with ${id} not found`;
            }
            return ProvinceDto().getList(result, 0);
        } catch (err) {
            return err.message
        }
    }

    const update = async (updateProvince) => {
        try {
            const isIdExist = await isProvinceCodeExists(updateProvince.id);
            if (isIdExist) {
                return isIdExist;
            }
            const newDate = new Date();
            const result = await db.query(UPDATE_PROVINCE, [updateProvince.name, newDate, updateProvince.id]);
            return ProvinceDto().createUpdate(result, 0);;
        } catch (err) {
            return err.message
        }
    }

    const remove = async (id) => {
        try {
            const isIdExist = await isProvinceCodeExists(id);
            if (isIdExist) {
                return isIdExist;
            }
            await db.query(DELETE_PROVINCE, [id]);
            return `Province with ID ${id} deleted success`;
        } catch (err) {
            return err.message
        }
    }

    const isProvinceNameExists = async (name) => {
        const result = await db.query(READ_BY_NAME_PROVINCE, [name]);
        if (result.rows.length > 0) {
            return `Province name with value ${name} already exist`;
        }
    }

    const isProvinceCodeExists = async (id) => {
        const result = await db.query(READ_BY_ID_PROVINCE, [id]);
        if (result.rows.length === 0) {
            return `Province ID with value ${id} not found`;
        }
    }

    return {
        add, list, get, update, remove
    }
}

module.exports = ProvinceRepository;
