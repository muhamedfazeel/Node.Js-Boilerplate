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
  db: {
    user: DB_USER || 'postgres',
    host: DB_HOST || 'postgres',
    name: DB_NAME || 'postgres',
    pass: DB_PASS || 'pass',
    port: DB_PORT || 5432,
  },
  secret: SECRET || 'S3cr3t',
  saltRounds: SALT_ROUNDS || 5
};

module.exports = config;