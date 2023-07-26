const { pool } = require('../config/database');
const { DEFAULT_ERR_MSG } = require('./constants');
const { AppError } = require('./errorHandler');
const { logger } = require('./logger');

module.exports.runQuery = async (query, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } catch (error) {
    logger.error(DEFAULT_ERR_MSG, error);
    throw new AppError(error);
  } finally {
    client.release();
  }
};