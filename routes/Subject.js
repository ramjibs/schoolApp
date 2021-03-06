const router = require('express').Router()
const SubjectController = require('../controllers/subjectController')
const debug = require('debug')('app:SubjectRouter')
const passport = require('passport')
router.get('/getAllSubjects',passport.authenticate('jwt', {session: false}),  SubjectController.getAllSubjects);
router.post('/addSubjects', SubjectController.addSubjects);


module.exports = SubjectRouter = router