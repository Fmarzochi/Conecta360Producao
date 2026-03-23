import { Router } from 'express';
import { CreateUserPFController } from '../controllers/CreateUserPFController';
import { CreateUserPFService } from 'src/services/CreateUserPFServices';

const userRoutes = Router();

// const user = new UserModel();
// const userService = new CreateUserPFService(user);
const userController = new CreateUserPFController();

userRoutes.post('/register', (req, res) =>  userController.handle(req, res));

export default userRoutes;