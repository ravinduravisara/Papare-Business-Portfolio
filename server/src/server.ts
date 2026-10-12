import { app } from './app.js';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import { runSeed } from './seeds/seed.js';
import { logger } from './utils/logger.js';

async function bootstrap() {
  try {
    await connectDB();
    
    // Auto-seed if database is reachable
    runSeed().catch((err) => {
      logger.warn('[Bootstrap] Auto-seed background note:', err.message);
    });

    const server = app.listen(env.PORT, () => {
      logger.info(`=======================================================`);
      logger.info(`⚡ ThePapare Events API Server running on port ${env.PORT}`);
      logger.info(`⚡ Environment: ${env.NODE_ENV}`);
      logger.info(`⚡ API Base Path: http://localhost:${env.PORT}/api/v1`);
      logger.info(`=======================================================`);
    });

    const gracefulShutdown = async (signal: string) => {
      logger.info(`[Server] ${signal} signal received: closing HTTP server.`);
      server.close(async () => {
        logger.info('[Server] HTTP server closed.');
        await disconnectDB();
        process.exit(0);
      });

      // Force close after 10s timeout
      setTimeout(() => {
        logger.error('[Server] Could not close connections in time, forcefully shutting down.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('[Bootstrap] Fatal startup error:', error);
    process.exit(1);
  }
}

bootstrap();

