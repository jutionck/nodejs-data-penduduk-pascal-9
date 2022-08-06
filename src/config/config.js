const { Pool } = require('pg');

const connectionString = 'postgresql://jutioncandrakirana:@localhost:5432/db_population'
const Config = new Pool({
    connectionString,
})

module.exports = Config
