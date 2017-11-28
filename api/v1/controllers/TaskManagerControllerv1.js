/* Task Manager
API Controller
Author: Sashiraj Chan
Date Created: 23-November-2017
Last Updated: 26-November-2017
*/

'use strict'
var chrono = require('chrono-node');
var cleaner = require('node-textcleaner');
var splitlines = require('split-lines');
var nlp = require('compromise');
var mysql = require('mysql');
var squel = require('squel');
var conn = require('../../../db.js')

let queryError = "Query encountered errors";
let successResponse = "Success";

/*
 * TODO: Use a proper nlp package to extract location data
 * TODO: Explore openmap API to extract list of places in Singapore to use as a guide
 */

// Custom function to sanitize the input and extract time and location
function cleanTask(task) {
    var cleanedTask = {
        "taskName": cleaner(task).toString(),
        // "taskLocation": nlp(cleaner(task)).places(),
        "taskDate": chrono.parseDate(cleaner(task)).toISOString().slice(0, 19).replace('T', ' ')
    };
    return cleanedTask;
}

// Custom function to build the JSON response
function responseBuilder(code, result) {
    return {
        "result": code,
        "result-text": result
    };
}

// Execute get query and return result
function executeQuery(sql, res) {
    conn.query(sql, function(err, result) {
        if (err) {
            return res.status(500).send(responseBuilder(false, queryError));
        }
        return res.status(200).send(responseBuilder(true, result));
    });
}

exports.getAllTask = function(req, res) {
    var sqlQuery = squel.select()
        .field("taskName")
        .field("taskDate")
        .from("task_manager")
        .toString()

    executeQuery(sqlQuery, res);

}

// Time must be in ISO8601 format
// Returns task by time
exports.getTaskByTime = function(req, res) {

    var sqlQuery = squel.select()
        .field("taskName")
        .field("taskDate")
        .from("task_manager")
        .where("taskDate = " + req.params.time.slice(0, 19).replace('T', ' ') + '"')
        .toString()

    executeQuery(sqlQuery, res);
}

// Adds a new task
exports.postTask = function(req, res) {

    var rawTaskBody = splitlines(req.body.task);
    var cleanedTask = rawTaskBody.map(cleanTask);

    var sqlQuery = squel.insert()
        .into("task_manager")
        .setFieldsRows(cleanedTask)
        .toString()

    conn.query(sqlQuery, function(err, result) {
        if (err) {
            return res.status(500).send(responseBuilder(false, queryError));
        }
        return res.status(200).send(responseBuilder(true, successResponse));
    });
}