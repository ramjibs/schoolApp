const router = require('express').Router();
const passport = require('passport')
const checkTokenController = require('../controllers/checkTokenController')
router.get('/', passport.authenticate('jwt', {session: false}), checkTokenController.checkToken )

module.exports = CheckTokenRouter = router