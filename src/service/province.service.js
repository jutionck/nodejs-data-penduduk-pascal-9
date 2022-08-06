const ProvinceService = (provinceRepository) => {
    const { add, list, get, update, remove } = provinceRepository;
    const create = async (province) => {
        if (province.id === '' || province.name === '') {
            return `Payload can\'t be empty`;
        }
        return await add(province);
    }

    const findAll = async () => {
        return await list();
    }

    const findById = async (id) => {
        return await get(id);
    }

    const updateData = async (province) => {
        if (province.id === '' || province.name === '') {
            return `Payload can\'t be empty`;
        }
        return await update(province);
    }

    const deleteData = async (id) => {
        return await remove(id);
    }

    return {
        create, findAll, findById, updateData, deleteData
    }
}

module.exports = ProvinceService
