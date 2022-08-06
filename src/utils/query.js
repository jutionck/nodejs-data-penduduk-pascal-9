const CREATE_PROVINCE = `insert into province (id,name,created_at) values ($1,$2,$3) returning *`;
const READ_ALL_PROVINCE = `select id,name,created_at,updated_at from province order by created_at desc`;
const READ_BY_ID_PROVINCE = `select id,name,created_at,updated_at from province where id=$1`;
const READ_BY_NAME_PROVINCE = `select name from province where name=$1`;
const UPDATE_PROVINCE = `update province set name=$1, updated_at=$2 where id=$3 returning *`;
const DELETE_PROVINCE = `delete from province where id=$1 returning id`;

const CREATE_REGENCY = `insert into regency (id,name,province_id,created_at) values ($1,$2,$3,$4) returning *`;
const READ_ALL_REGENCY = `select r.id,r.name,p.id as provinceId,p.name as provinceName,p.created_at as createdAt,p.updated_at as updatedAt,r.created_at,r.updated_at from regency r join province p on p.id=r.province_id order by r.created_at desc`;
const READ_BY_ID_REGENCY = `select r.id,r.name,p.id as provinceId,p.name as provinceName,p.created_at as createdAt,p.updated_at as updatedAt,r.created_at,r.updated_at from regency r join province p on p.id=r.province_id where r.id=$1`;
const READ_BY_NAME_REGENCY = `select name from regency where name=$1`;
const UPDATE_REGENCY = `update regency set name=$1,province_id=$2, updated_at=$3 where id=$4 returning *`;
const DELETE_REGENCY = `delete from regency where id=$1 returning id`;

const CREATE_DISTRICT = `insert into district (id,name,regency_id,created_at) values ($1,$2,$3,$4) returning *`;
const READ_ALL_DISTRICT = `select d.id,d.name,r.id as regencyId, r.name as regencyName,r.created_at as createdAt,r.updated_at as updatedAt,d.created_at,d.updated_at,p.id as provinceId,p.name as provinceName,p.created_at as pCreatedAt,p.updated_at as pUpdatedAt from district d join regency r on r.id=d.regency_id join province p on p.id=r.province_id order by d.created_at desc`;
const READ_BY_ID_DISTRICT = `select d.id,d.name,r.id as regencyId, r.name as regencyName,r.created_at as createdAt,r.updated_at as updatedAt,d.created_at,d.updated_at,p.id as provinceId,p.name as provinceName,p.created_at as pCreatedAt,p.updated_at as pUpdatedAt from district d join regency r on r.id=d.regency_id join province p on p.id=r.province_id where d.id=$1`;
const READ_BY_NAME_DISTRICT = `select name from district where name=$1`;
const UPDATE_DISTRICT = `update district set name=$1,regency_id=$2, updated_at=$3 where id=$4 returning *`;
const DELETE_DISTRICT = `delete from district where id=$1 returning id`;

const CREATE_PEOPLE = `insert into people (id,nik,name,gender,dob,pob,province_id,regency_id,district_id,created_at) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *`;
const READ_ALL_PEOPLE = `select pe.id,pe.nik,pe.name,pe.gender,pe.dob,pe.pob,pe.created_at,pe.updated_at,pr.id as provinceId,pr.name as provinceName,pr.created_at as prCreatedAt,pr.updated_at as prUpdatedAt,re.id as regencyId,re.name as regencyName,re.created_at as reCreatedAt,re.updated_at as reUpdatedAt,di.id as districtId,di.name as districtName,di.created_at as diCreatedAt,di.updated_at as diUpdatedAt from people pe join province pr on pr.id=pe.province_id join regency re on re.id=pe.regency_id join district di on di.id=pe.district_id order by pe.created_at desc`;
const READ_BY_ID_PEOPLE = `select pe.id,pe.nik,pe.name,pe.gender,pe.dob,pe.pob,pe.created_at,pe.updated_at,pr.id as provinceId,pr.name as provinceName,pr.created_at as prCreatedAt,pr.updated_at as prUpdatedAt,re.id as regencyId,re.name as regencyName,re.created_at as reCreatedAt,re.updated_at as reUpdatedAt,di.id as districtId,di.name as districtName,di.created_at as diCreatedAt,di.updated_at as diUpdatedAt from people pe join province pr on pr.id=pe.province_id join regency re on re.id=pe.regency_id join district di on di.id=pe.district_id where pe.id = $1`;
const READ_BY_NIK_PEOPLE = `select pe.id,pe.nik,pe.name,pe.gender,pe.dob,pe.pob,pe.created_at,pe.updated_at,pr.id as provinceId,pr.name as provinceName,pr.created_at as prCreatedAt,pr.updated_at as prUpdatedAt,re.id as regencyId,re.name as regencyName,re.created_at as reCreatedAt,re.updated_at as reUpdatedAt,di.id as districtId,di.name as districtName,di.created_at as diCreatedAt,di.updated_at as diUpdatedAt from people pe join province pr on pr.id=pe.province_id join regency re on re.id=pe.regency_id join district di on di.id=pe.district_id where pe.nik = $1`;
const UPDATE_PEOPLE = `update people set nik=$1,name=$2,gender=$3,dob=$4,pob=$5,province_id=$6,regency_id=$7,ditrict_id=$8,updated_at=$9 where id=$10 returning *`;
const DELETE_PEOPLE = `delete from people where id=$1`

module.exports = {
    CREATE_PROVINCE,READ_ALL_PROVINCE,UPDATE_PROVINCE,DELETE_PROVINCE,READ_BY_ID_PROVINCE, READ_BY_NAME_PROVINCE,
    CREATE_REGENCY,READ_ALL_REGENCY,READ_BY_ID_REGENCY,UPDATE_REGENCY,DELETE_REGENCY, READ_BY_NAME_REGENCY,
    CREATE_DISTRICT,READ_ALL_DISTRICT,READ_BY_ID_DISTRICT,UPDATE_DISTRICT,DELETE_DISTRICT,READ_BY_NAME_DISTRICT,
    CREATE_PEOPLE,READ_ALL_PEOPLE,READ_BY_ID_PEOPLE,UPDATE_PEOPLE,DELETE_PEOPLE,READ_BY_NIK_PEOPLE
}
