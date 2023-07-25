CREATE TABLE IF NOT EXISTS user (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  roles JSON DEFAULT '["USER"]',
  created_by INTEGER DEFAULT NULL,
  created_datetime TIMESTAMP DEFAULT NOW(),
  updated_by INTEGER,
  updated_datetime TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE
);