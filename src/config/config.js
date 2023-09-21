require('dotenv').config();
const {
  PROJECT,
  PORT,
  SERVER_ENV,
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  SECRET,
  SALT_ROUNDS
} = process.env;

const config = {
  project: PROJECT,
  port: PORT,
  serverEnv: SERVER_ENV,
  dbUser: DB_USER,
  dbHost: DB_HOST,
  dbName: DB_NAME,
  dbPass: DB_PASS,
  dbPort: DB_PORT,
  secret: SECRET,
  saltRounds: SALT_ROUNDS
};

module.exports = config;