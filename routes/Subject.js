const router = require('express').Router()
const SubjectController = require('../controllers/subjectController')
const debug = require('debug')('app:SubjectRouter')

router.get('/getAllSubjects',  SubjectController.getAllSubjects);
router.post('/addSubjects', SubjectController.addSubjects);


module.exports = SubjectRouter = router