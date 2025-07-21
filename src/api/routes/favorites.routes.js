const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', favoritesController.getUserFavorites);
router.post('/', favoritesController.addFavorite);
router.delete('/:hotelId', favoritesController.removeFavorite);
router.get('/check/:hotelId', favoritesController.checkFavorite);

module.exports = router; 