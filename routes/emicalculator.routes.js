const router = require('express').Router();
const EmiCalculatorController = require('../controllers/emicalculator.controller');


router.post('/emicalculate', EmiCalculatorController.calculateEmi);


module.exports = router;