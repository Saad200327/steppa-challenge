let io;

export function initSocket(socketIo) {
  io = socketIo;
  io.on('connection', (socket) => {
    socket.on('challenge:subscribe', (challengeId) => {
      socket.join(`challenge:${challengeId}`);
    });
    socket.on('steps:submit', (data) => {
      io.to(`challenge:${data.challengeId}`).emit('steps:update', data);
    });
  });
}

export function emitToChallenge(challengeId, event, data) {
  if (io) io.to(`challenge:${challengeId}`).emit(event, data);
}

export function emitToUser(userId, event, data) {
  if (io) io.to(`user:${userId}`).emit(event, data);
}

export function broadcastLeaderboardUpdate(challengeId, data) {
  emitToChallenge(challengeId, 'leaderboard:update', data);
}
