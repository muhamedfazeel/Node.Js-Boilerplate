const { Pool } = require('pg');
const config = require('./config');

module.exports.pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.name,
    password: config.db.pass,
    port: config.db.port,
});