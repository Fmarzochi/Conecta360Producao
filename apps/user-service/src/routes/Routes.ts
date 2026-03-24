import { Router } from 'express';
import { CreateUserPFController } from '../controllers/CreateUserPFController';
import { CreateUserPJController } from '../controllers/CreateUserPJController';

const userRoutes = Router();

const createUserPFController = new CreateUserPFController();
const createUserPJController = new CreateUserPJController();


userRoutes.post('/register', (req, res) =>  createUserPFController.handle(req, res));
userRoutes.post('/register-company', (req, res) =>  createUserPJController.handle(req, res));


export default userRoutes;