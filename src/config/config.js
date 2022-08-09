const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DRIVER } = process.env;

const connectionString = `${DB_DRIVER}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
const Config = new Pool({
    connectionString,
})

module.exports = Config
