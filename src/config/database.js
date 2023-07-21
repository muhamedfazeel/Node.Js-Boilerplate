const { Pool } = require('pg');
const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = require('./constants');

module.exports.pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT,
});