const { runQuery } = require('../../utils/dbClient');
const { AppError } = require('../../utils/errorHandler');
const { HTTP_NOT_FOUND } = require('../../utils/httpStatusCodes');

exports.getUserByUsernameOrEmail = async (email, username) => {
  const query = `
    SELECT 
      id,
      name,
      email,
      username,
      password
    FROM node.user
    WHERE email = $1 OR username = $2 AND is_deleted = FALSE;
  `;
  const result = await runQuery(
    query,
    [email, username]
  );
  return result.rows[0];
};

exports.createNewUser = async ({ name, email, username, password, roles, user }) => {
  const query = `
    INSERT INTO node.user (
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
  const result = await runQuery(
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
  return result?.rows[0]?.id || null;
};

exports.fetchUsers = async () => {
  const query = `
    SELECT
      id,
      name,
      email,
      roles,
      created_by,
      created_datetime
    FROM node.user
    WHERE is_deleted = FALSE;
  `;
  const users = await runQuery(query);
  return users?.rows || {};
};

exports.fetchUserById = async (userId) => {
  const query = `
    SELECT
      id,
      roles
    FROM node.user
    WHERE id = $1 AND is_deleted = FALSE;
  `;
  const user = await runQuery(query, [userId]);
  if (user?.rows?.length) {
    return user.rows[0];
  } else {
    userNotFoundError();
  }
};

exports.updateUser = async ({ name, email, password, roles, user, userId }) => {
  const query = `
    UPDATE node.user SET
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
  const { rowCount } = await runQuery(
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
};

exports.deleteUser = async (userId) => {
  const query = `
    UPDATE node.user SET
      is_deleted = TRUE
    WHERE id = $1 AND is_deleted = FALSE;
  `;
  const { rowCount } = await runQuery(query, [userId]);
  if (rowCount) {
    return rowCount;
  } else {
    userNotFoundError();
  }
};

const userNotFoundError = () => {
  throw new AppError('User not found', HTTP_NOT_FOUND);
};