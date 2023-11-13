import express from 'express';
import { getUserById, register, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserById)
router.post('/', register);
router.put('/:id', updateUser)


export default router;