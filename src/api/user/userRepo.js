const { pool } = require('../../config/database');
const { DEFAULT_ERR_MSG } = require('../../utils/responseMessages');
const { runQuery } = require('../../utils/dbClient');
const { AppError } = require('../../utils/errorHandler');
const { logger } = require('../../utils/logger');
const { HTTP_NOT_FOUND } = require('../../utils/httpStatusCodes');

exports.getUserByUsernameOrEmail = async (email, username) => {
  const query = `
    SELECT 
      id,
      name,
      email,
      username,
      password
    FROM user
    WHERE email = $1 OR username = $2 AND is_deleted = FALSE;
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

exports.createNewUser = async ({ name, email, username, password, roles, user }) => {
  const client = await pool.connect();
  const query = `
    INSERT INTO users (
      name,
      email,
      username,
      password,
      roles,
      created_by,
      created_datetime
    ) VALUES ($1, $2, $3, $4, $5, $6, NOW)
    RETURNING id;
  `;
  try {
    const result = await client.query(
      query,
      [
        name,
        email,
        username,
        password,
        roles,
        user
      ]
    );
    return result.rows[0].id;
  } catch (error) {
    logger.error(DEFAULT_ERR_MSG, error);
    new AppError(error);
  } finally {
    client.release();
  }
};

exports.fetchUsers = async () => {
  const client = await pool.connect();
  const query = `
    SELECT
      id,
      name,
      email,
      roles,
      created_by,
      created_datetime
    WHERE is_deleted = FALSE;
  `;
  try {
    const users = await client.query(query);
    return users?.rows || {};
  } catch (error) {
    logger.error(DEFAULT_ERR_MSG, error);
    new AppError(error);
  } finally {
    client.release();
  }
};

exports.fetchUserById = async (userId) => {
  const client = await pool.connect();
  const query = `
    SELECT
      id,
      roles
    WHERE id = $1 AND is_deleted = FALSE;
  `;
  try {
    const user = await client.query(query, [userId]);
    if (user?.rows?.length) {
      return user.rows[0];
    } else {
      userNotFoundError();
    }
  } catch (error) {
    logger.error(error.message || DEFAULT_ERR_MSG, error);
    new AppError(error);
  } finally {
    client.release();
  }
};

exports.updateUser = async ({ name, email, password, roles, user, userId }) => {
  const client = await pool.connect();
  const query = `
    UPDATE users SET
      name = CASE
          WHEN $1 IS NOT NULL THEN $1
          ELSE name
        END,
      email = CASE
          WHEN $2 IS NOT NULL THEN $2
          ELSE email
        END,
      password = CASE
          WHEN $3 IS NOT NULL THEN $3
          ELSE password
        END,
      roles = CASE
          WHEN $4 is NOT NULL THEN $4
          ELSE roles
        END,
      updated_by = $5,
      updated_datetime = NOW
    WHERE id = $6 AND is_deleted = FALSE
    RETURNING id;
  `;
  try {
    const { rowCount } = await client.query(
      query,
      [
        name,
        email,
        password,
        roles,
        user,
        userId
      ]
    );
    if (rowCount) {
      return true;
    } else {
      userNotFoundError();
    }
  } catch (error) {
    logger.error(error.message || DEFAULT_ERR_MSG, error);
    new AppError(error);
  } finally {
    client.release();
  }
};

exports.deleteUser = async (userId) => {
  const client = await pool.connect();
  const query = `
    UPDATE users SET
      is_deleted = TRUE
    WHERE id = $1 AND is_deleted = FALSE;
  `;
  try {
    const { rowCount } = await client.query(query, [userId]);
    if (rowCount) {
      return rowCount;
    } else {
      userNotFoundError();
    }
  } catch (error) {
    logger.error(error.message || DEFAULT_ERR_MSG, error);
    new AppError(error);
  } finally {
    client.release();
  }
};

const userNotFoundError = () => {
  throw new Error('User not found', HTTP_NOT_FOUND);
};