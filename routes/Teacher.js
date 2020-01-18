const router = require('express').Router()
const debug = require('debug')('app:TeacherRouter')
const mail = require('../services/mail')
const passport = require('passport')
const TeacherController = require('../controllers/teacherController')
const UserController = require('../controllers/UserController')


router.post('/addTeacher',passport.authenticate('jwt', {session: false}), UserController.addUser, TeacherController.addTeacherProfile, mail.sendNotification)
router.get('/getTeacherProfile/:id',passport.authenticate('jwt', {session: false}), TeacherController.getTeacher)
router.post('/inviteTeacher',passport.authenticate('jwt', {session: false}), TeacherController.inviteTeacher)
router.get('/updateTeacher/:id',passport.authenticate('jwt', {session: false}), TeacherController.updateTeacher)

module.exports = TeacherRouter = router