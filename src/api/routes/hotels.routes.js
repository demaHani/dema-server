const express = require('express');
const router = express.Router();
const hotelsController = require('../controllers/hotels.controller');
const reviewsController = require('../controllers/reviews.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', hotelsController.getAllHotels);
router.get('/:id', hotelsController.getHotelById);

// Review routes
router.get('/:id/reviews', reviewsController.getReviewsByHotel);
router.post('/:id/reviews', authMiddleware, reviewsController.addReview);
router.delete('/reviews/:reviewId', authMiddleware, reviewsController.deleteReview);

module.exports = router; 