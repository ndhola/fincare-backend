const router = require('express').Router();
const EmiCalculatorController = require('../controllers/emicalculator.controller');


router.get('/emicalculate', EmiCalculatorController.calculateEmi);


module.exports = router;