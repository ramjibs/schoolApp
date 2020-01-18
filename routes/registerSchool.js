const router = require('express').Router();
const RegisterSchoolController = require('../controllers/registerSchool')
const UserController = require('../controllers/UserController')
const debug = require('debug')('app:registerSchoolRouter')
const mail = require('../services/mail')

router.post('/registerSchool',RegisterSchoolController.addSchool, mail.sendNotification )
router.get('/getSchools', RegisterSchoolController.getSchools)
router.put('/setSchoolAcceptence/:id', RegisterSchoolController.setSchoolAcceptence,UserController.addUser,RegisterSchoolController.addSchoolProfile,mail.sendNotification)

module.exports = RegisterSchool = router;