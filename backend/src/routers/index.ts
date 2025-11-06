import {Router} from 'express';
import authRouter from './auth';
import roomsRouter from './rooms';
import bookingsRouter from './bookings';
const router = Router();
router.use('/auth', authRouter)
router.use('/rooms', roomsRouter)
router.use('/bookings', bookingsRouter)
export default router;