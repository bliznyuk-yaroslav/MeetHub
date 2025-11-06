import { Request, Response } from 'express';
import { prisma } from '../db/prisma';

const overlaps = async (roomId: number, start: Date, end: Date, excludeId?: number) => {
  return await prisma.booking.findFirst({
    where: {
      roomId,
      ...(excludeId ? { id: { not: excludeId } } : {}),
      start: { lt: end },
      end: { gt: start },
    },
  });
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const { roomId, start, end, description } = req.body as {
      roomId: string | number;
      start: string;
      end: string;
      description?: string | null;
    };

    const roomIdNum = Number(roomId);
    if (Number.isNaN(roomIdNum)) return res.status(400).json({ message: 'Invalid room id' });

    // must be Admin of the room to create booking
    const member = await prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId: roomIdNum, userId: user.id } },
    });
    if (!member || member.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    const s = new Date(start);
    const e = new Date(end);
    if (s >= e) return res.status(400).json({ message: 'Invalid time range' });

    const conflict = await overlaps(roomIdNum, s, e);
    if (conflict) return res.status(409).json({ message: 'Time conflict' });

    const booking = await prisma.booking.create({
      data: {
        roomId: roomIdNum,
        userId: user.id,
        start: s,
        end: e,
        description: description ?? null,
      },
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: 'Create booking failed', error });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid booking id' });

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Booking not found' });
    const membership = await prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId: existing.roomId, userId: user.id } },
    });
    if (!membership || membership.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    const { start, end, description } = req.body as {
      start?: string;
      end?: string;
      description?: string | null;
    };

    const s = start ? new Date(start) : existing.start;
    const e = end ? new Date(end) : existing.end;
    if (s >= e) return res.status(400).json({ message: 'Invalid time range' });

    const conflict = await overlaps(existing.roomId, s, e, id);
    if (conflict) return res.status(409).json({ message: 'Time conflict' });

    const updated = await prisma.booking.update({
      where: { id },
      data: { start: s, end: e, description: description ?? existing.description },
    });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Update booking failed', error });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid booking id' });

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Booking not found' });

    // Only Admin of room can delete
    const membership = await prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId: existing.roomId, userId: user.id } },
    });
    if (!membership || membership.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    await prisma.booking.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Delete booking failed', error });
  }
};

export const joinBooking = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid booking id' });

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Booking not found' });

    // Any room member can join
    const membership = await prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId: existing.roomId, userId: user.id } },
    });
    if (!membership) return res.status(403).json({ message: 'Forbidden' });

    await prisma.bookingParticipant.upsert({
      where: { bookingId_userId: { bookingId: id, userId: user.id } },
      update: {},
      create: { bookingId: id, userId: user.id },
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: 'Join booking failed', error });
  }
};

export const leaveBooking = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid booking id' });

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Booking not found' });

    // Any room member can leave
    const membership = await prisma.roomMember.findUnique({
      where: { roomId_userId: { roomId: existing.roomId, userId: user.id } },
    });
    if (!membership) return res.status(403).json({ message: 'Forbidden' });

    await prisma.bookingParticipant.deleteMany({ where: { bookingId: id, userId: user.id } });
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: 'Leave booking failed', error });
  }
};
