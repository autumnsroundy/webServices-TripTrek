const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);
router.get('/:username', usersController.getUserByUserName);
router.post('/', usersController.createNewUser);
router.put('/:username', usersController.updateUser);
router.delete('/:username', usersController.deleteUser);

module.exports = router;
