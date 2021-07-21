/*
 * Author: Devraj Singh
 */

const router = require('express').Router();
const OptReportsController = require('../controllers/optreports.controller');

router.get('/ping', OptReportsController.ping)
router.get('/', OptReportsController.getAllOptReports);
router.get('/:user_id', OptReportsController.getOptReports);
router.post('/', OptReportsController.createOptreports);
router.put('/:user_id', OptReportsController.editOptreports);

module.exports = router;