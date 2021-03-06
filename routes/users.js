const router = require('express').Router();
const { getUsers, getCurrentUser, createUser } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getCurrentUser);
router.post('/users', createUser);

module.exports = router;
