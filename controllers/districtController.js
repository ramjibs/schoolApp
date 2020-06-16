const mongoose = require('mongoose')
const debug = require('debug')('app:DistrictController')
const District = require('../models/District')


module.exports.addDistrict =  async (req, res, next) =>{


    try{

       

        const district_id = new mongoose.Types.ObjectId()

        const newDistrict = new District({
            _id: district_id,
            districts:req.body.districts
        })

        await newDistrict.save()

        res.locals.district_id = district_id

        next()
    }
    catch(error){

        debug(error)
    }

}

module.exports.getDistrict = async(req,res) =>{

    try {

        const district = await District.findById({
            _id: req.params.id
        })

        return res.status(200).json(district)
        
    } catch (error) {
        debug(error)
    }
}