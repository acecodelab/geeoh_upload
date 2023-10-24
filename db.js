const pgp = require('pg-promise')();

// Replace these values with your PostgreSQL connection details
const connection = {
    host: 'localhost',
    port: 5432, // Default PostgreSQL port
    database: 'geeoh_upload',
    user: 'postgres',
    password: 'postgres',
};

const db = pgp(connection);

module.exports = db;