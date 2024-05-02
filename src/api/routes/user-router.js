import express from 'express';
import {
    getUser,
    getUserById,
    getUserByUsername,
    postUser,
    userLoginPost,
    putUser,
    deleteUser,
    getUserInfo,
    updatePasswordController
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);
userRouter.route('/info/:id').get(getUserInfo).put(putUser);
userRouter.route('/login').post(userLoginPost);
userRouter.route('/:id')
    .get(getUserById)
    .put(putUser)
    .delete(deleteUser);
userRouter.route('/password/:id').put(updatePasswordController);
userRouter.route('/name/:tunnus').get(getUserByUsername);

export default userRouter;