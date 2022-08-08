const Routes = () => {
    const POST_PROVINCE = 'province';
    const PUT_PROVINCE = 'province';
    const GET_PROVINCE_LIST = 'province';
    const GET_PROVINCE_SEARCH = 'province';
    const GET_PROVINCE = 'province/:id';
    const DELETE_PROVINCE = 'province/:id';

    const POST_REGENCY = 'regency';
    const PUT_REGENCY = 'regency';
    const GET_REGENCY_LIST = 'regency';
    const GET_REGENCY_SEARCH = 'regency';
    const GET_REGENCY = 'regency/:id';
    const DELETE_REGENCY = 'regency/:id';

    const POST_DISTRICT = 'district';
    const PUT_DISTRICT = 'district';
    const GET_DISTRICT_LIST = 'district';
    const GET_DISTRICT_SEARCH = 'district';
    const GET_DISTRICT = 'district/:id';
    const DELETE_DISTRICT = 'district/:id';

    const POST_PEOPLE = 'people';
    const PUT_PEOPLE = 'people';
    const GET_PEOPLE_LIST = 'people';
    const GET_PEOPLE_SEARCH = 'people';
    const GET_PEOPLE = 'people/:id';
    const DELETE_PEOPLE = 'people/:id';

    return {
        POST_PROVINCE, PUT_PROVINCE, GET_PROVINCE, GET_PROVINCE_LIST, GET_PROVINCE_SEARCH, DELETE_PROVINCE,
        POST_REGENCY, PUT_REGENCY, GET_REGENCY, GET_REGENCY_LIST, GET_REGENCY_SEARCH, DELETE_REGENCY,
        POST_DISTRICT, PUT_DISTRICT, GET_DISTRICT, GET_DISTRICT_LIST, GET_DISTRICT_SEARCH, DELETE_DISTRICT,
        POST_PEOPLE, PUT_PEOPLE, GET_PEOPLE, GET_PEOPLE_LIST, GET_PEOPLE_SEARCH, DELETE_PEOPLE
    }
}

module.exports = Routes;
