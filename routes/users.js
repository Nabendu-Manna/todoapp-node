import express from 'express';
var router = express.Router();

import UserController from '../controllers/user.controller.js';


router.get('/', UserController.taskList);
router.get('/:id', UserController.task);
router.post('/', UserController.createTask);
router.put('/:id', UserController.updateTask);
router.delete('/:id', UserController.deleteTask);

export default router;