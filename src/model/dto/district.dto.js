const DistrictDto = () => {
    const createUpdate = (result, regencyOfAdd, provOfAdd, index = 0) => {
        return {
            id: result.rows[index].id,
            name: result.rows[index].name,
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
            createdAt: result.rows[index].created_at,
            updatedAt: result.rows[index].updated_at,
        }
    }

    const getList = (result, i) => {
        return {
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
        }
    }

    return {
        createUpdate, getList
    }
}

module.exports = DistrictDto
