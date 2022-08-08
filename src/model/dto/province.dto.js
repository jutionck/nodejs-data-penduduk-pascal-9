const ProvinceDto = () => {
    const createUpdate = (result, i = 0) => {
        return  {
            id: result.rows[i].id,
            name: result.rows[i].name,
            createdAt: result.rows[i].created_at,
            updatedAt: result.rows[i].updated_at,
        }
    }

    const getList = (result, i) => {
        return {
            id: result.rows[i].id,
            name: result.rows[i].name,
            createdAt: result.rows[i].created_at,
            updatedAt: result.rows[i].updated_at,
        }
    }

    return {
        createUpdate, getList
    }
}

module.exports = ProvinceDto
