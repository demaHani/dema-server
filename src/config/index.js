const path = require('path');

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  carApiKey: process.env.CAR_API_KEY,
  carApiSecret: process.env.CAR_API_SECRET,
  carApiBaseUrl: process.env.CAR_API_BASE_URL || 'https://carapi.app',
}; 