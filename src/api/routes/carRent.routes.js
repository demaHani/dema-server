const express = require('express');
const router = express.Router();
const carRentController = require('../controllers/carRent.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/models', carRentController.getCarModels);
router.get('/search', carRentController.searchCars);
router.post('/quote', authMiddleware, carRentController.getQuote);
router.post('/book', authMiddleware, carRentController.bookCar);

module.exports = router; 