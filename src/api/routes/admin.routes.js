const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminAuthMiddleware = require('../middleware/adminAuth.middleware');

// --- Public Admin Route ---
// This route is for logging in and does not require a token.
router.post('/login', authController.adminLogin);

// --- Protected Admin Routes ---
// All routes defined below this line are protected and require a valid admin token.
router.use(authMiddleware);
router.use(adminAuthMiddleware);

// Dashboard
router.get('/stats', adminController.getDashboardStats);
router.get('/bookings/recent', adminController.getRecentBookings);

// User Management
router.get('/users', adminController.getAllUsers);

// Hotel Management
router.get('/hotels', adminController.getAllHotels);
router.post('/hotels', adminController.createHotel);
router.put('/hotels/:id', adminController.updateHotel);
router.delete('/hotels/:id', adminController.deleteHotel);

// Booking Management
router.get('/bookings', adminController.getAllBookings);
router.patch('/bookings/:id/status', adminController.updateBookingStatus);

module.exports = router; 