const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

// Delete a user
router.delete('/:userId', usersController.deleteUser);

module.exports = router;
