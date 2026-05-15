import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  logger.error(err.message, err.stack);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
