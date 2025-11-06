import { Router } from 'express';
import authenticate from '../middlewares/auth';
import validateBody from '../middlewares/validateBody';
import { createRoomSchema, updateRoomSchema, addMemberSchema } from '../schemas/rooms';
import { addMember, createRoom, deleteRoom, getRoom, listMyRooms, listRoomBookings, updateRoom } from '../controllers/roomsController';

const router = Router();

router.get('/mine', authenticate, listMyRooms);
router.get('/:id', authenticate, getRoom);
router.post('/', authenticate, validateBody(createRoomSchema), createRoom);
router.patch('/:id', authenticate, validateBody(updateRoomSchema), updateRoom);
router.delete('/:id', authenticate, deleteRoom);
router.post('/:id/members', authenticate, validateBody(addMemberSchema), addMember);
router.get('/:id/bookings', authenticate, listRoomBookings);

export default router;
