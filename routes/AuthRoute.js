const express = require('express')
const router = express.Router()
const AuthControllers = require('../controllers/AuthControllers')


router.post('/new', AuthControllers.register)
router.post('/login', AuthControllers.login)

module.exports = router