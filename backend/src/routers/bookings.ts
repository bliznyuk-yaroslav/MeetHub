import { Router } from 'express';
import authenticate from '../middlewares/auth';
import validateBody from '../middlewares/validateBody';
import { createBookingSchema, updateBookingSchema } from '../schemas/bookings';
import { createBooking, deleteBooking, updateBooking } from '../controllers/bookingsController';

const router = Router();

router.post('/', authenticate, validateBody(createBookingSchema), createBooking);
router.patch('/:id', authenticate, validateBody(updateBookingSchema), updateBooking);
router.delete('/:id', authenticate, deleteBooking);

export default router;
