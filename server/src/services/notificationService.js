import { PrismaClient } from '@prisma/client';
import { emitToUser } from './socketService.js';

const prisma = new PrismaClient();

export async function sendNotification(userId, type, data) {
  const titles = {
    challenge_won: '🎉 You Won!',
    challenge_lost: '💔 Challenge Lost',
    panic_alert: '⚠️ Panic Alert',
    friend_joined: '👥 Friend Joined',
    taunt: '😂 Taunt Received',
  };
  const bodies = {
    challenge_won: `You earned ${data} StepCoins!`,
    challenge_lost: `You lost ${data} StepCoins.`,
    panic_alert: data,
    friend_joined: `A friend joined a challenge!`,
    taunt: data,
  };
  const notification = await prisma.notification.create({
    data: {
      userId,
      type,
      title: titles[type] || 'Notification',
      body: bodies[type] || String(data),
    },
  });
  emitToUser(userId, 'notification', notification);
  return notification;
}
