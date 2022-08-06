const RegencyService = (regencyRepository) => {
    const { add, list, get, update, remove } = regencyRepository;
    const create = async (regency) => {
        if (regency.id === '' || regency.name === '' || regency.provinceId === '') {
            return `Payload can\'t be empty`;
        }
        return await add(regency);
    }

    const findAll = async () => {
        return await list();
    }

    const findById = async (id) => {
        return await get(id);
    }

    const updateData = async (regency) => {
        if (regency.id === '' || regency.name === '' || regency.provinceId === '') {
            return `Payload can\'t be empty`;
        }
        return await update(regency);
    }

    const deleteData = async (id) => {
        return await remove(id);
    }

    return {
        create, findAll, findById, updateData, deleteData
    }
}

module.exports = RegencyService
