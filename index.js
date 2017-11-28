/*User profile engine
Index
Author: Sashiraj Chan
Date Created: 22-November-2017
Last Edited: 26-November-2017
*/

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var config = require('./config.json')

console.log('info', 'App Started!');

// Body parser code, to parse headers properly
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Initialize Routes
var routes = require('./api/routes/TaskManagerRoute');
routes(app);

// Start the server
app.listen(port);
console.log('Task Manager API server started on ' + port);

// Make Connection String
var con = mysql.createConnection({
    host: config.database.db_host,
    user: config.database.db_username,
    password: config.database.db_password,
    database: config.database.db_name
});

// Establish Database Connection
con.connect(function(err) {
    if (err) {
        console.log("error Could not connect to DB");
    } else {
        console.log("info Connected to DB!");
    }
});