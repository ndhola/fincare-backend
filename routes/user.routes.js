const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router.get('/users', UserController.getAllUsers);
router.put('/update/:id', UserController.updateUser);
router.post('/add', UserController.addUser);
router.get('/user/:id', UserController.getUser);

module.exports = router;