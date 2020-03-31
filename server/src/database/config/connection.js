require('env2')('./config.env');

const { Pool } = require('pg');

let dbUrl = '';

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.TEST_DB_URL;
} else if (process.env.NODE_ENV === 'production') {
  dbUrl = process.env.DATABASE_URL;
} else {
  dbUrl = process.env.DB_URL;
}

const isConnectionString = dbUrl;
const isCI = process.env.POSTGRES_PORT && process.env.POSTGRES_HOST;

if (!isConnectionString && isCI) throw new Error('No Database FOUND');

const options = isConnectionString
  ? {
      connectionString: dbUrl,
      ssl: false,
    }
  : {
      user: 'postgres',
      database: 'postgres',
      password: 'postgres',
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
    };

module.exports = new Pool(options);
