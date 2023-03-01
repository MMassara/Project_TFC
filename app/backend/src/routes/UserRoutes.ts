import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
// import UserValidation from '../middlewares/UserValidation';

const userRoutes = Router();
const userController = new UserController();
// const userValidation = new UserValidation();

userRoutes.post('/', (req: Request, res: Response) => userController.sucessLogin(req, res));
userRoutes.get('/role', (req: Request, res: Response) => userController.validateToken(req, res));

export default userRoutes;
