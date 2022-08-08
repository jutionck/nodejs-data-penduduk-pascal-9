const PeopleDto =  () => {
    const createUpdate = (result, index = 0, prov, rgc, dist) => {
        return {
            id: result.rows[index].id,
            nik: result.rows[index].nik,
            name: result.rows[index].name,
            gender: result.rows[index].gender,
            dob: result.rows[index].dob,
            pob: result.rows[index].pob,
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
    }

    const getList = (result, i) => {
        return {
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
        }
    }

    return {
        createUpdate, getList
    }
}

module.exports = PeopleDto
