import dotenv from 'dotenv';
import app from './app';
import { prisma } from './config/database';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Database connection test
async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database query test successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    
    // Start HTTP server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running in ${NODE_ENV} mode`);
      console.log(`🌐 Server URL: http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
      console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
      
      if (NODE_ENV === 'development') {
        console.log('\n🔧 Development mode features:');
        console.log('   - Detailed error messages');
        console.log('   - Request logging enabled');
        console.log('   - CORS enabled for localhost');
      }
    });
    
    // Handle server errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      
      const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
      
      switch (error.code) {
        case 'EACCES':
          console.error(`❌ ${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`❌ ${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
    
    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n🛑 ${signal} received, starting graceful shutdown...`);
      
      server.close(async () => {
        console.log('🔌 HTTP server closed');
        
        try {
          await prisma.$disconnect();
          console.log('🗄️  Database connection closed');
          console.log('✅ Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during shutdown:', error);
          process.exit(1);
        }
      });
      
      // Force close after 10 seconds
      setTimeout(() => {
        console.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };
    
    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('❌ Uncaught Exception thrown:', error);
  process.exit(1);
});

// Start the server
startServer();