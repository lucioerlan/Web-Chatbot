require('dotenv').config();

// client: 'pg' 'postgresql'-- production development
const options = {
  development: {
    client: 'pg',   //  pg, mssql , mysql, oracle
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
    },
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },
};

const environment = process.env.NODE_ENV || 'development';
const config = options[environment];

module.exports = config;
