const { Pool } = require('pg');
const config = require('./config');

module.exports.pool = new Pool({
    user: config.dbUser,
    host: config.dbHost,
    database: config.dbName,
    password: config.dbPass,
    port: config.dbPort,
});