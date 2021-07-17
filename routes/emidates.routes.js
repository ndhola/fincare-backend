const router = require('express').Router();
const EmidatesController = require('../controllers/emidates.controller');

router.get('/ping', EmidatesController.ping)
router.get('/', EmidatesController.getAllEmidates);
router.get('/:user_id', EmidatesController.getEmidates);
router.post('/', EmidatesController.createEmidates);
router.put('/:emi_id', EmidatesController.editEmidates);
router.delete('/:emi_id', EmidatesController.deleteEmidates);

module.exports = router;