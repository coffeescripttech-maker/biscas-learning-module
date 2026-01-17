const config = require('./config');
const app = require('./app');

const server = app.listen(config.port, () => {
  const logger = app.locals.logger;
  logger.info(`Server started on port ${config.port}`);
  logger.info(`Environment: ${config.env}`);
  logger.info(`Health check available at http://localhost:${config.port}/health`);
  logger.info('Configuration loaded successfully');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  const logger = app.locals.logger;
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  const logger = app.locals.logger;
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;
