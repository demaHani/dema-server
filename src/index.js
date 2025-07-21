require('./loadEnv'); // Load environment variables first!

const path = require('path');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const connectDb = require('./db');

const app = express();

// Middleware
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));

// Static files for hotel images
app.use('/uploads/hotels', express.static(path.join(__dirname, '../../uploads/hotels')));

// API routes
app.use('/api/auth', require('./api/routes/auth.routes'));
app.use('/api/hotels', require('./api/routes/hotels.routes'));
app.use('/api/bookings', require('./api/routes/bookings.routes'));
app.use('/api/favorites', require('./api/routes/favorites.routes'));
app.use('/api/carRent', require('./api/routes/carRent.routes'));
app.use('/api/admin', require('./api/routes/admin.routes'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
const start = async () => {
  await connectDb();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

start(); 