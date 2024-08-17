import express from 'express';
import jwtVerify from '../middleware/jwtVerify.js';
import taskController from '../controller/taskController.js';
import taskReqValidator from '../middleware/task/taskReqValidator.js';
import expressValidator from '../middleware/expressValidator.js';

const taskRouter = express.Router();

/**
 * @usage : Create a Task
 * @url : http://localhost:7070/tasks
 * @params : title, description, status
 * @method : POST
 * @access : PRIVATE
 */

taskRouter.post(
  '/',
  jwtVerify,
  taskReqValidator,
  expressValidator,
  taskController.createTask
);

/**
 * @usage : Get Tasks
 * @url : http://localhost:7070/tasks
 * @params : none
 * @method : GET
 * @access : PRIVATE
 */

taskRouter.get('/', jwtVerify, taskController.getTask);

/**
 * @usage : Update a Task
 * @url : http://localhost:7070/tasks/:taskId
 * @urlparams: taskId
 * @params : title, description, status
 * @method : PUT
 * @access : PRIVATE
 */

taskRouter.put(
  '/:taskId',
  jwtVerify,
  taskReqValidator,
  expressValidator,
  taskController.updateTask
);

/**
 * @usage : Delete a Task by taskId
 * @url : http://localhost:7070/tasks/:taskId
 * @urlparams: taskId
 * @params : none
 * @method : DELETE
 * @access : PRIVATE
 */

taskRouter.delete('/:taskId', jwtVerify, taskController.deleteTask);

/**
 * @usage : Admin Get All Tasks
 * @url : http://localhost:7070/tasks/admin
 * @params : none
 * @method : GET
 * @access : PRIVATE
 */

taskRouter.get('/admin', jwtVerify, taskController.getAllTasksAdmin);

export default taskRouter;
