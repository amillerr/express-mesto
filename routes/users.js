const router = require('express').Router()
const { getUsers, getCurrentUser } = require('../controllers/users')

router.get('/users', getUsers)
router.get('/users/:id', getCurrentUser)

module.exports = router
