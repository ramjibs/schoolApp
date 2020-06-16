const router = require('express').Router();
const passport = require('passport')
const categoryController = require('../controllers/categoryController')

router.post('/add', categoryController.addCategory )
router.get('/getCategories',passport.authenticate('jwt', {session: false}),categoryController.getCategories)

module.exports = CategoryRouter = router