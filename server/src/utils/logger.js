const levels = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = process.env.NODE_ENV === 'production' ? 1 : 3;

function log(level, ...args) {
  if (levels[level] <= currentLevel) {
    const ts = new Date().toISOString();
    console[level === 'error' ? 'error' : 'log'](`[${ts}] [${level.toUpperCase()}]`, ...args);
  }
}

export const logger = {
  error: (...args) => log('error', ...args),
  warn: (...args) => log('warn', ...args),
  info: (...args) => log('info', ...args),
  debug: (...args) => log('debug', ...args),
};
