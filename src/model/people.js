const People = (id, nik, name, gender, dob, pob, provinceId, regencyId, districtId, createdAt, updatedAt) => {
    return {
        id,
        nik,
        name,
        gender,
        dob,
        pob,
        provinceId,
        regencyId,
        districtId,
        createdAt,
        updatedAt
    }
}

module.exports = People;
