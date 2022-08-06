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
                const people = {
                    id: result.rows[0].id,
                    nik: result.rows[0].nik,
                    name: result.rows[0].name,
                    gender: result.rows[0].gender,
                    dob: result.rows[0].dob,
                    pob: result.rows[0].pob,
                    province: {
                      id: prov.id,
                      name: prov.name,
                      createdAt: prov.createdAt,
                      updatedAt: prov.updatedAt,
                    },
                    regency: {
                        id: rgc.id,
                        name: rgc.name,
                        province: {
                            id: prov.id,
                            name: prov.name,
                            createdAt: prov.createdAt,
                            updatedAt: prov.updatedAt,
                        },
                        createdAt: rgc.createdAt,
                        updatedAt: rgc.updatedAt,
                    },
                    district: {
                        id: dist.id,
                        name: dist.name,
                        regency: {
                            id: rgc.id,
                            name: rgc.name,
                            province: {
                                id: prov.id,
                                name: prov.name,
                                createdAt: prov.createdAt,
                                updatedAt: prov.updatedAt,
                            },
                            createdAt: prov.createdAt,
                            updatedAt: prov.updatedAt,
                        },
                        createdAt: dist.createdAt,
                        updatedAt: dist.updatedAt,
                    },
                    createdAt: result.rows[0].created_at,
                    updatedAt: result.rows[0].updated_at,
                }
                return people;
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
                people.push({
                    id: result.rows[i].id,
                    name: result.rows[i].name,
                    nik: result.rows[i].nik,
                    gender: result.rows[i].gender,
                    dob: result.rows[i].dob,
                    pob: result.rows[i].pob,
                    province: {
                        id: result.rows[i].provinceid,
                        name: result.rows[i].provincename,
                        createdAt: result.rows[i].prcreatedat,
                        updatedAt: result.rows[i].prupdatedat,
                    },
                    regency: {
                        id: result.rows[i].regencyid,
                        name: result.rows[i].regencyname,
                        province: {
                            id: result.rows[i].provinceid,
                            name: result.rows[i].provincename,
                            createdAt: result.rows[i].prcreatedat,
                            updatedAt: result.rows[i].prupdatedat,
                        },
                        createdAt: result.rows[i].recreatedat,
                        updatedAt: result.rows[i].reupdatedat,
                    },
                    district: {
                        id: result.rows[i].regencyid,
                        name: result.rows[i].regencyname,
                        regency: {
                            id: result.rows[i].regencyid,
                            name: result.rows[i].regencyname,
                            province: {
                                id: result.rows[i].provinceid,
                                name: result.rows[i].provincename,
                                createdAt: result.rows[i].prcreatedat,
                                updatedAt: result.rows[i].prupdatedat,
                            },
                            createdAt: result.rows[i].recreatedat,
                            updatedAt: result.rows[i].reupdatedat,
                        },
                        createdAt: result.rows[i].dicreatedat,
                        updatedAt: result.rows[i].diupdatedat,
                    },
                    createdAt: result.rows[i].created_at,
                    updatedAt: result.rows[i].updated_at,
                });
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
            const person = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                nik: result.rows[0].nik,
                gender: result.rows[0].gender,
                dob: result.rows[0].dob,
                pob: result.rows[0].pob,
                province: {
                    id: result.rows[0].provinceid,
                    name: result.rows[0].provincename,
                    createdAt: result.rows[0].prcreatedat,
                    updatedAt: result.rows[0].prupdatedat,
                },
                regency: {
                    id: result.rows[0].regencyid,
                    name: result.rows[0].regencyname,
                    province: {
                        id: result.rows[0].provinceid,
                        name: result.rows[0].provincename,
                        createdAt: result.rows[0].prcreatedat,
                        updatedAt: result.rows[0].prupdatedat,
                    },
                    createdAt: result.rows[0].recreatedat,
                    updatedAt: result.rows[0].reupdatedat,
                },
                district: {
                    id: result.rows[0].regencyid,
                    name: result.rows[0].regencyname,
                    regency: {
                        id: result.rows[0].regencyid,
                        name: result.rows[0].regencyname,
                        province: {
                            id: result.rows[0].provinceid,
                            name: result.rows[0].provincename,
                            createdAt: result.rows[0].prcreatedat,
                            updatedAt: result.rows[0].prupdatedat,
                        },
                        createdAt: result.rows[0].recreatedat,
                        updatedAt: result.rows[0].reupdatedat,
                    },
                    createdAt: result.rows[0].dicreatedat,
                    updatedAt: result.rows[0].diupdatedat,
                },
                createdAt: result.rows[0].created_at,
                updatedAt: result.rows[0].updated_at,
            }
            return person;
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
            const person = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                nik: result.rows[0].nik,
                gender: result.rows[0].gender,
                dob: result.rows[0].dob,
                pob: result.rows[0].pob,
                province: {
                    id: result.rows[0].provinceid,
                    name: result.rows[0].provincename,
                    createdAt: result.rows[0].prcreatedat,
                    updatedAt: result.rows[0].prupdatedat,
                },
                regency: {
                    id: result.rows[0].regencyid,
                    name: result.rows[0].regencyname,
                    province: {
                        id: result.rows[0].provinceid,
                        name: result.rows[0].provincename,
                        createdAt: result.rows[0].prcreatedat,
                        updatedAt: result.rows[0].prupdatedat,
                    },
                    createdAt: result.rows[0].recreatedat,
                    updatedAt: result.rows[0].reupdatedat,
                },
                district: {
                    id: result.rows[0].regencyid,
                    name: result.rows[0].regencyname,
                    regency: {
                        id: result.rows[0].regencyid,
                        name: result.rows[0].regencyname,
                        province: {
                            id: result.rows[0].provinceid,
                            name: result.rows[0].provincename,
                            createdAt: result.rows[0].prcreatedat,
                            updatedAt: result.rows[0].prupdatedat,
                        },
                        createdAt: result.rows[0].recreatedat,
                        updatedAt: result.rows[0].reupdatedat,
                    },
                    createdAt: result.rows[0].dicreatedat,
                    updatedAt: result.rows[0].diupdatedat,
                },
                createdAt: result.rows[0].created_at,
                updatedAt: result.rows[0].updated_at,
            }
            return person;
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
