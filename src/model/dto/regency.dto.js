const RegencyDto = () => {
    const createUpdate = (result, provinceOfAdd, index = 0) => {
        return {
            id: result.rows[index].id,
            name: result.rows[index].name,
            province: {
                id: provinceOfAdd.id,
                name: provinceOfAdd.name,
                createdAt: provinceOfAdd.createdAt,
                updatedAt: provinceOfAdd.updatedAt,
            },
            createdAt: result.rows[index].created_at,
            updatedAt: result.rows[index].updated_at,
        }
    }

    const getList = (result, index) => {
        return {
            id: result.rows[index].id,
            name: result.rows[index].name,
            province: {
                id: result.rows[index].provinceid,
                name: result.rows[index].provincename,
                createdAt: result.rows[index].createdat,
                updatedAt: result.rows[index].updatedat,
            },
            createdAt: result.rows[index].created_at,
            updatedAt: result.rows[index].updated_at,
        }
    }

    return {
        createUpdate, getList
    }
}

module.exports = RegencyDto
