import express from 'express';
var router = express.Router();

import TaskController from '../controllers/todo.conrtoller.js';


router.get('/', TaskController.taskList);
router.get('/:id', TaskController.task);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.patch('/change-status/:id', TaskController.changeTaskStatus);

export default router