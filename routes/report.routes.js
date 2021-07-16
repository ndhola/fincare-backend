const router = require('express').Router();
const ReportsController = require('../controllers/reports.controller');

router.post('/getDataByMonth/:userId', ReportsController.getDataByMonth);
router.get('/getLastFiveMonthData/:userId', ReportsController.getLastFiveMonthData);
router.get('/getLastTenDaysData/:userId', ReportsController.getLastTenDaysData);

module.exports = router;