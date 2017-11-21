/*User profile engine
Index
Author: Sashiraj Chan
Date Created: 22-November-2017
Last Edited: 22-November-2017
*/

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var path = require('path');

console.log('info', 'App Started!');

// Body parser code, to parse headers properly
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Initialize Routes
var routes = require('./api/route/TaskManagerRoute');
routes(app);

// Start the server
app.listen(port);
console.log('Task Manager API server started on ' + port);
