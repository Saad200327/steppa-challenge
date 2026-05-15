import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function sendFriendRequest(req, res, next) {
  try {
    const { username } = req.body;
    const receiver = await prisma.user.findUnique({ where: { username } });
    if (!receiver) return res.status(404).json({ message: 'User not found' });
    if (receiver.id === req.user.userId) return res.status(400).json({ message: 'Cannot add yourself' });
    const friendship = await prisma.friendship.create({
      data: { senderId: req.user.userId, receiverId: receiver.id },
    });
    res.status(201).json(friendship);
  } catch (err) { next(err); }
}

export async function acceptFriendRequest(req, res, next) {
  try {
    const friendship = await prisma.friendship.update({
      where: { id: req.params.id },
      data: { status: 'accepted' },
    });
    res.json(friendship);
  } catch (err) { next(err); }
}

export async function getFriends(req, res, next) {
  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [{ senderId: req.user.userId, status: 'accepted' }, { receiverId: req.user.userId, status: 'accepted' }],
      },
      include: {
        sender: { select: { id: true, username: true, displayName: true, avatarUrl: true, winStreak: true } },
        receiver: { select: { id: true, username: true, displayName: true, avatarUrl: true, winStreak: true } },
      },
    });
    const friends = friendships.map((f) => (f.senderId === req.user.userId ? f.receiver : f.sender));
    res.json(friends);
  } catch (err) { next(err); }
}

export async function createGroup(req, res, next) {
  try {
    const { name, description, isPrivate } = req.body;
    const group = await prisma.group.create({
      data: { name, description, createdBy: req.user.userId, isPrivate: !!isPrivate, members: { create: { userId: req.user.userId, role: 'admin' } } },
    });
    res.status(201).json(group);
  } catch (err) { next(err); }
}

export async function joinGroup(req, res, next) {
  try {
    const group = await prisma.group.findFirst({ where: { inviteCode: req.params.code } });
    if (!group) return res.status(404).json({ message: 'Invalid invite code' });
    const member = await prisma.groupMember.create({ data: { groupId: group.id, userId: req.user.userId } });
    res.status(201).json(member);
  } catch (err) { next(err); }
}

export async function getGroup(req, res, next) {
  try {
    const group = await prisma.group.findUnique({
      where: { id: req.params.id },
      include: { members: { include: { user: { select: { id: true, username: true, displayName: true, avatarUrl: true } } } }, challenges: true },
    });
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json(group);
  } catch (err) { next(err); }
}

export async function sendTaunt(req, res, next) {
  try {
    const receiver = await prisma.user.findUnique({ where: { id: req.params.userId } });
    if (!receiver) return res.status(404).json({ message: 'User not found' });
    const sender = await prisma.user.findUnique({ where: { id: req.user.userId } });
    const notification = await prisma.notification.create({
      data: {
        userId: receiver.id,
        type: 'taunt',
        title: `${sender.displayName} sent a taunt!`,
        body: req.body.message || `${sender.displayName} says: Still haven\'t hit your steps? 😂`,
      },
    });
    res.status(201).json(notification);
  } catch (err) { next(err); }
}
