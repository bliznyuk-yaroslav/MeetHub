import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

type RoleString = 'Admin' | 'User';

const ensureRoomAdmin = async (userId: number, roomId: number) => {
  const member = await prisma.roomMember.findUnique({
    where: { roomId_userId: { roomId, userId } },
  });
  return member?.role === 'Admin';
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const { name, description } = req.body as { name: string; description?: string | null };

    const room = await prisma.room.create({
      data: {
        name,
        description: description ?? null,
        ownerId: user.id,
        members: {
          create: [{ userId: user.id, role: 'Admin' }],
        },
      },
    });

    return res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({ message: 'Create room failed', error });
  }
};

export const listMyRooms = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const rooms = await prisma.room.findMany({
      where: { members: { some: { userId: user.id } } },
      include: {
        members: { where: { userId: user.id }, select: { role: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const shaped = rooms.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      ownerId: r.ownerId,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      role: (r as any).members?.[0]?.role as RoleString | undefined,
    }));

    return res.status(200).json(shaped);
  } catch (error) {
    return res.status(500).json({ message: 'List my rooms failed', error });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const roomId = Number(req.params.id);
    if (Number.isNaN(roomId)) return res.status(400).json({ message: 'Invalid room id' });

    const member = await prisma.roomMember.findUnique({ where: { roomId_userId: { roomId, userId: user.id } } });
    if (!member) return res.status(403).json({ message: 'Forbidden' });

    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) return res.status(404).json({ message: 'Room not found' });

    return res.status(200).json({ ...room, role: member.role });
  } catch (error) {
    return res.status(500).json({ message: 'Get room failed', error });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const roomId = Number(req.params.id);
    if (Number.isNaN(roomId)) return res.status(400).json({ message: 'Invalid room id' });

    const isAdmin = await ensureRoomAdmin(user.id, roomId);
    if (!isAdmin) return res.status(403).json({ message: 'Forbidden' });

    const { name, description } = req.body as { name?: string; description?: string | null };
    const room = await prisma.room.update({
      where: { id: roomId },
      data: { name, description },
    });
    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: 'Update room failed', error });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const roomId = Number(req.params.id);
    if (Number.isNaN(roomId)) return res.status(400).json({ message: 'Invalid room id' });

    const isAdmin = await ensureRoomAdmin(user.id, roomId);
    if (!isAdmin) return res.status(403).json({ message: 'Forbidden' });

    await prisma.booking.deleteMany({ where: { roomId } });
    await prisma.roomMember.deleteMany({ where: { roomId } });
    await prisma.room.delete({ where: { id: roomId } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Delete room failed', error });
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const roomId = Number(req.params.id);
    if (Number.isNaN(roomId)) return res.status(400).json({ message: 'Invalid room id' });
    const { email, role } = req.body as { email: string; role: RoleString };

    const isAdmin = await ensureRoomAdmin(user.id, roomId);
    if (!isAdmin) return res.status(403).json({ message: 'Forbidden' });

    const target = await prisma.user.findUnique({ where: { email } });
    if (!target) return res.status(404).json({ message: 'User not found' });

    const member = await prisma.roomMember.upsert({
      where: { roomId_userId: { roomId, userId: target.id } },
      update: { role },
      create: { roomId, userId: target.id, role },
    });
    return res.status(200).json(member);
  } catch (error) {
    return res.status(500).json({ message: 'Add member failed', error });
  }
};

export const listRoomBookings = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const roomId = Number(req.params.id);
    if (Number.isNaN(roomId)) return res.status(400).json({ message: 'Invalid room id' });

    const member = await prisma.roomMember.findUnique({ where: { roomId_userId: { roomId, userId: user.id } } });
    if (!member) return res.status(403).json({ message: 'Forbidden' });

    const bookings = await prisma.booking.findMany({ where: { roomId }, orderBy: { start: 'asc' } });
    const ids = bookings.map((b) => b.id);
    const joins = await prisma.bookingParticipant.findMany({ where: { bookingId: { in: ids }, userId: user.id } });
    const joinedSet = new Set(joins.map((j) => j.bookingId));
    const shaped = bookings.map((b) => ({ ...b, joined: joinedSet.has(b.id) }));
    return res.status(200).json(shaped);
  } catch (error) {
    return res.status(500).json({ message: 'List bookings failed', error });
  }
};
