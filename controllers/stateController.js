const mongoose = require('mongoose')
const debug = require('debug')('app:stateController')
const State = require('../models/State')


module.exports.addstate =  async (req, res, next) =>{


    try{

        const state_id = new mongoose.Types.ObjectId()

        const newState = new State({
            _id: state_id,
            stateName:req.body.stateName,
            _districts: res.locals.district_id
        })

        await newState.save()

        return res.json("Success")

        
    }
    catch(error){

        debug(error)
    }

}

module.exports.getAllStates =  async (req, res) =>{

    try {

        const states = await State.find({})

        return res.status(200).json(states)
        
    } catch (error) {
        debug(error)
    }
}