const router = require('express').Router();
const userController = require('../controllers/UserController')
const mail = require('../services/mail')
router.get('/login', userController.loginUser)
router.post('/forgotPassword', userController.requestChangePassword,mail.sendNotification)
router.post('/changePassword',userController.changePassword)
module.exports = UserRouter = router