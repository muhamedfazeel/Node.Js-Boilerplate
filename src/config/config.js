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
  project: PROJECT || 'Node',
  port: PORT || 3355,
  serverEnv: SERVER_ENV || 'DEVELOPMENT',
  dbUser: DB_USER || 'postgres',
  dbHost: DB_HOST || 'postgres',
  dbName: DB_NAME || 'postgres',
  dbPass: DB_PASS || 'pass',
  dbPort: DB_PORT || 5432,
  secret: SECRET || 'S3cr3t',
  saltRounds: SALT_ROUNDS || 5
};

module.exports = config;