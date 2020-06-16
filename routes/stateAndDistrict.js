const router = require('express').Router()
const StateController = require('../controllers/stateController')
const DistrictController = require('../controllers/districtController')
const passport = require('passport')

router.post('/add', DistrictController.addDistrict, StateController.addstate)
router.get('/getAllStates', passport.authenticate('jwt', {session: false}), StateController.getAllStates)
router.get('/getDistrict/:id',passport.authenticate('jwt', {session: false}), DistrictController.getDistrict)

module.exports = StateAndDistrictRouter = router