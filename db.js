var mysql = require('mysql');
var config = require('./config.json')

// Create new connection
var connection = mysql.createConnection({
    host: config.database.db_host,
    user: config.database.db_username,
    password: config.database.db_password,
    database: config.database.db_name
});

module.exports = connection;