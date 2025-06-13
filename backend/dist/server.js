"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
async function connectDatabase() {
    try {
        await database_1.prisma.$connect();
        console.log('✅ Database connected successfully');
        await database_1.prisma.$queryRaw `SELECT 1`;
        console.log('✅ Database query test successful');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}
async function startServer() {
    try {
        await connectDatabase();
        const server = app_1.default.listen(PORT, () => {
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
        server.on('error', (error) => {
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
        const gracefulShutdown = async (signal) => {
            console.log(`\n🛑 ${signal} received, starting graceful shutdown...`);
            server.close(async () => {
                console.log('🔌 HTTP server closed');
                try {
                    await database_1.prisma.$disconnect();
                    console.log('🗄️  Database connection closed');
                    console.log('✅ Graceful shutdown completed');
                    process.exit(0);
                }
                catch (error) {
                    console.error('❌ Error during shutdown:', error);
                    process.exit(1);
                }
            });
            setTimeout(() => {
                console.error('❌ Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 10000);
        };
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception thrown:', error);
    process.exit(1);
});
startServer();
//# sourceMappingURL=server.js.map