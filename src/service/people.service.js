const PeopleService = (peopleRepository) => {
    const { add, list, get, remove, getByNik } = peopleRepository;
    const create = async (person) => {
        if (
            person.id === '' ||
            person.name === '' ||
            person.gender === '' ||
            person.dob === '' ||
            person.pob === '' ||
            person.provinceId === '' ||
            person.regencyId === '' ||
            person.districtId === ''
        ) {
            return `Payload can\'t be empty`;
        }
        return await add(person);
    }

    const findAll = async () => {
        return await list();
    }

    const findById = async (id) => {
        return await get(id);
    }

    const findByNik = async (nik) => {
        return await getByNik(nik);
    }

    const deleteData = async (id) => {
        return await remove(id);
    }

    return {
        create, findAll, findById, deleteData, findByNik
    }
}

module.exports = PeopleService
