require('dotenv').config();

module.exports.PROJECT = process.env.PROJECT || 'Base';
module.exports.PORT = process.env.PORT || 3000;
module.exports.SERVER_ENV = process.env.SERVER_ENV || 'DEVELOPMENT';
module.exports.DB_HOST = process.env.DB_HOST || 'localhost';
module.exports.DB_NAME = process.env.DB_NAME || 'postgres';
module.exports.DB_USER = process.env.DB_USER || 'postgres';
module.exports.DB_PASS = process.env.DB_PASS || 'postgres';
module.exports.DB_PORT = process.env.DB_PORT || 5432;

module.exports.INTERNAL_SERVER_ERROR_MSG = 'Internal Server Error';
module.exports.DEFAULT_ERR_MSG = 'An Error occured: ';
