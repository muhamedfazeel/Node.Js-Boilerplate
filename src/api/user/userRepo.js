const { pool } = require('../../config/database');
const { DEFAULT_ERR_MSG } = require('../../utils/responseMessages');
const { runQuery } = require('../../utils/dbClient');
const { AppError } = require('../../utils/errorHandler');
const { logger } = require('../../utils/logger');

exports.getUserByUsernameOrEmail = async (email, username) => {
  const query = `
    SELECT 
      id,
      name,
      email,
      username,
      password
    FROM user
    WHERE email = $1 OR username = $2;
  `;
  try {
    const result = await runQuery(
      query,
      [email, username]
    );
    return result.rows[0];
  } catch (error) {
    logger.error(DEFAULT_ERR_MSG, error);
    new AppError(error);
  }
};

exports.createNewUser = async ({ name, email, username, password, roles }) => {
  const client = await pool.connect();
  const insertQuery = `
    INSERT INTO users (
      name,
      email,
      username,
      password,
      roles
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;
  const updateQuery = `
    UPDATE users SET
      created_by = $1,
      updated_by = $1,
      updated_datetime = NOW()
    WHERE id = $1;
  `;
  try {
    await client.query('BEGIN');
    const result = await client.query(
      insertQuery,
      [
        name,
        email,
        username,
        password,
        roles
      ]
    );
    await client.query(
      updateQuery,
      [result?.rows[0]?.id]
    );
    await client.query('COMMIT');
    return result.rows[0].id;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error(DEFAULT_ERR_MSG, error);
    new AppError(error);
  } finally {
    client.release();
  }
};