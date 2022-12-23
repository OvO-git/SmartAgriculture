const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_eop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool