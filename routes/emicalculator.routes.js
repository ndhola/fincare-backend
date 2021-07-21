/**
 * Author: Jemis Rameshbhai Zadafiya (B00873589)
 */
const router = require('express').Router();
const EmiCalculatorController = require('../controllers/emicalculator.controller');

// route for EMICalculator, Method: POST
router.post('/emicalculate', EmiCalculatorController.calculateEmi);

module.exports = router;