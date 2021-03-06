require('env2')('./config.env');

const { Pool } = require('pg');

let dbUrl = '';

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.TEST_DB_URL;
  console.log(process.env)
} else if (process.env.NODE_ENV === 'production') {
  dbUrl = process.env.DATABASE_URL;
} else {
  dbUrl = process.env.DB_URL;
}

if (!dbUrl) throw new Error('No Database FOUND');

const options = {
  connectionString: dbUrl,
  ssl: true,
};

module.exports = new Pool(options);
