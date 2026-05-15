import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { initSocket } from './services/socketService.js';
import { startSettlementJob } from './jobs/midnightSettlement.js';
import { startPanicAlertJob } from './jobs/panicAlerts.js';
import { startStepSyncJob } from './jobs/stepSync.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

initSocket(io);
startSettlementJob();
startPanicAlertJob();
startStepSyncJob();

server.listen(PORT, () => {
  logger.info(`👟 Steppa Challenge server running on port ${PORT}`);
});
