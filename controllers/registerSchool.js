const RegisterSchool = require('../models/RegisterSchool');
const UserController = require('./UserController')
const debug = require('debug')('app:registerSchoolController')
const {message} = require('../utils/message')
const { findById } = require('../helpers/findUser')
const Profile = require('../models/Profile')
const mongoose = require('mongoose')
const User = require('../models/User')
//add new School

module.exports.addSchool = async (req, res, next) => {

    try {
        
        const school = await RegisterSchool.findOne({ email: req.body.email })

        if (school && school.acceptence === message.constants.registration.registration_accepted) {
            return res.status(403).json({ msg:  message.error_messages.registerError.email_id_exists })
        }
        else if (school && school.acceptence === message.constants.registration.registration_pending) {
            return res.status(403).json({ msg: message.error_messages.registerError.under_verification })
        }


        let newRegisterSchool = new RegisterSchool({

            schoolName: req.body.schoolName,
            email: req.body.email,
            registrationNumber: req.body.registrationNumber,
            licenseNumber: req.body.licenseNumber

        })
        await newRegisterSchool.save()

        res.locals.mailName = 'SchoolRegistered';

        res.json({ msg: message.constants.registration.registration_success})


        next()



    }
    catch (err) {

        debug(err)

    }




}

module.exports.getSchools = async (req, res) => {

    try {

        const schools = await RegisterSchool.find({ acceptence: req.body.acceptence })
        
        if (schools.length === 0) {

            return res.json({ msg: message.error_messages.registerError.school_not_exist })
        }
        return res.json(schools)

    }
    catch (err) {
        debug(err)
    }



}





module.exports.setSchoolAcceptence = async (req, res, next) => {


    try {
        const school = await RegisterSchool.findByIdAndUpdate({ _id: req.params.id },{
            acceptence: req.body.acceptence
        },
        {
            new: true,
            useFindAndModify: false
        })
        
    }
    catch (err) {
        debug(err)
    }

    next()


}

module.exports.addSchoolProfile = async (req, res, next) => {


    try{

        const school = await RegisterSchool.findOne({ email: req.body.email })
        
        if(user) {
             
            const profile = new Profile({
                _id: new mongoose.Types.ObjectId(),
                name: school.schoolName,
                address: req.body.address,
                contactNumber: req.body.contactNumber,
                school : {
                    registrationNumber: school.registrationNumber,
                    licenseNumber: school.licenseNumber
                }
            })

            await profile.save()

            await User.findOneAndUpdate({
                _id: res.locals.id
            },
                {
                    _profile: profile._id
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            )


            next();
            
        }

    }
    catch(err){
        debug(err)
    }
}
