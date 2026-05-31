import express from 'express';
import { userLogin, home } from '../controller/userController.js';
const userRouter = express.Router();

userRouter.get('/', home);
userRouter.get('/users', userLogin);

export default userRouter;
