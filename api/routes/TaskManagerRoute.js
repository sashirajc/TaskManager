/* Task Manager
API Routes
Author: Sashiraj Chan
Date Created: 23-November-2017
Last Updated: 26-November-2017
*/

'use strict'

module.exports = function(app) {
    var taskManagerControllerv1 = require('../v1/controllers/TaskManagerControllerv1');

    app
        .route('/v1/tasks')
        .get(taskManagerControllerv1.getAllTask);

    app
        .route('/v1/tasks/')
        .post(taskManagerControllerv1.postTask);

    app
        .route('/v1/tasks/:time')
        .get(taskManagerControllerv1.getTaskByTime);
}