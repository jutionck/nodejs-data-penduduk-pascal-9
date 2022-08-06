const DistrictService = (districtRepository) => {
    const { add, list, get, update, remove } = districtRepository;
    const create = async (district) => {
        if (district.id === '' || district.name === '' || district.regencyId === '') {
            return `Payload can\'t be empty`;
        }
        return await add(district);
    }

    const findAll = async () => {
        return await list();
    }

    const findById = async (id) => {
        return await get(id);
    }

    const updateData = async (district) => {
        if (district.id === '' || district.name === '' || district.regencyId === '') {
            return `Payload can\'t be empty`;
        }
        return await update(district);
    }

    const deleteData = async (id) => {
        return await remove(id);
    }

    return {
        create, findAll, findById, updateData, deleteData
    }
}

module.exports = DistrictService
