const {
    CREATE_PEOPLE,
    READ_BY_ID_PEOPLE,
    READ_BY_NIK_PEOPLE,
    READ_ALL_PEOPLE,
    DELETE_PEOPLE} = require('../utils/query');
const ProvinceService = require("../service/province.service");
const RegencyService = require("../service/regency.service");
const DistrictService = require("../service/district.service");
const Config = require("../config/config");
const ProvinceRepository = require("./province.repository");
const RegencyRepository = require("./regency.repository");
const DistrictRepository = require("./district.repository");
const PeopleDto = require('../model/dto/people.dto');

const PeopleRepository = (db) => {
    const add = async (newPeople) => {
        try {
            const newDate = new Date();
            const nik = await generateNIK(newPeople.gender, newPeople.dob, newPeople.provinceId, newPeople.regencyId, newPeople.districtId);
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            const result = await db.query(
                CREATE_PEOPLE,
                [
                    newPeople.id,
                    nik + randomNumber,
                    newPeople.name,
                    newPeople.gender,
                    newPeople.dob,
                    newPeople.pob,
                    newPeople.provinceId,
                    newPeople.regencyId,
                    newPeople.districtId,
                    newDate
                ]);
            const prov = await isProvinceExist(result.rows[0].province_id);
            const rgc = await isRegencyExist(result.rows[0].regency_id);
            const dist = await isDistrictExist(result.rows[0].district_id);
            if (prov || rgc || dist) {
                return PeopleDto().createUpdate(result, 0, prov, rgc, dist);
            }
        } catch (err) {
            console.log(err)
            return err.message
        }
    }

    const list = async () => {
        try {
            const result = await db.query(READ_ALL_PEOPLE);
            const people = [];
            for (let i = 0;i < result.rows.length; i++) {
                people.push(PeopleDto().getList(result, i));
            }
            return people;
        } catch (err) {
            return err.message
        }
    }

    const get = async (id) => {
        try {
            const result = await db.query(READ_BY_ID_PEOPLE, [id]);
            if (result.rows.length === 0) {
                return `ID with ${id} not found`;
            }
            return PeopleDto().getList(result, 0);
        } catch (err) {
            return err.message
        }
    }

    const getByNik = async (nik) => {
        try {
            const result = await db.query(READ_BY_NIK_PEOPLE, [nik]);
            if (result.rows.length === 0) {
                return `NIK with ${nik} not found`;
            }
            return PeopleDto().getList(result, 0);;
        } catch (err) {
            return err.message
        }
    }

    const remove = async (id) => {
        try {
            const isIdExist = await isPeopleCodeExists(id);
            if (isIdExist) {
                return isIdExist;
            }
            await db.query(DELETE_PEOPLE, [id]);
            return `People with ID ${id} deleted success`;
        } catch (err) {
            return err.message
        }
    }

    const isPeopleCodeExists = async (id) => {
        const result = await db.query(READ_BY_ID_PEOPLE, [id]);
        if (result.rows.length === 0) {
            return `People ID with value ${id} not found`;
        }
    }

    const generateNIK = async (gender, dob, provinceId, regencyId, districtId) => {
        const province = await isProvinceExist(provinceId);
        const regency = await isDistrictExist(regencyId);
        const district = await isRegencyExist(districtId);
        if (province || regency || district) {
            let dobPattern = '';
            dob = dob.split('-');
            gender = gender.toLowerCase();
            if (gender.toLowerCase() === 'laki-laki'){
                dobPattern = `${dob[2]}${dob[1]}${dob[0].slice(2,4)}`
            } else {
                dobPattern = `${Number(dob[2]) + 40}${dob[1]}${dob[0].slice(2,4)}`
            }
            return province.id + regency.id + district.id + dobPattern;
        }
        return `Data not valid`;
    }

    const isProvinceExist = async (id) => {
        const provinceService = ProvinceService(ProvinceRepository(Config));
        return await provinceService.findById(id);
    }

    const isRegencyExist = async (id) => {
        const regencyService = RegencyService(RegencyRepository(Config));
        return await regencyService.findById(id);
    }

    const isDistrictExist = async (id) => {
        const districtService = DistrictService(DistrictRepository(Config));
        return await districtService.findById(id);
    }

    return {
        add, list, get, remove, getByNik
    }
}

module.exports = PeopleRepository;
