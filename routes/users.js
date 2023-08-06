import express from 'express';
var router = express.Router();

import UserController from '../controllers/user.controller.js';


router.get('/', UserController.userList);
router.get('/:id', UserController.user);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;