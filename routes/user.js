const router = require('express').Router();
const userController = require('../controllers/UserController')
const mail = require('../services/mail')
router.post('/login', userController.loginUser)
router.post('/forgotPassword', userController.requestChangePassword,mail.sendNotification)
router.post('/changePassword',userController.changePassword,userController.loginUser)
module.exports = UserRouter = router