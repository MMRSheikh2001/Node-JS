const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/register', userController.register);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;