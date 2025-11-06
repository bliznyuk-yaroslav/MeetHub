import { Router } from 'express';
import { login, register } from '../controllers/authController';
import validateBody from '../middlewares/validateBody';
import { loginSchema, registerSchema } from '../schemas/auth';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

export default router;