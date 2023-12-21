const { Pool } = require('pg');
const config = require('./config');

module.exports.pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASS,
    port: config.DB_PORT,
});
