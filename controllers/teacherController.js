const User = require('../models/User')
const Profile = require('../models/Profile')
const debug = require('debug')('app:TeacherController')
const { message } = require('../utils/message')
const { findByEmail, findUser, findById } = require('../helpers/findUser')
const mongoose = require('mongoose')
const { generatePassword, decryptPassword } = require('../helpers/generateEncryptor')
const EmailAuth = require('../models/EmailAuth')
const InvitationAuth = require('../models/InvitationAuth')

module.exports.addTeacherProfile = async (req, res, next) => {

    try {

        const user = await findByEmail(req.body.email);

        if (req.body.id === req.user._id) {

            const profile = new Profile({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                address: req.body.address,
                contactNumber: req.body.contactNumber,
                teacher: {
                    qualification: req.body.teacher.qualification,
                    experience: req.body.teacher.experience
                },

            })

            await profile.save()


            await User.findOneAndUpdate({
                _id: user._id
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
    catch (err) {
        debug(err)
        return res.json({msg: message.error_messages.something_wrong})
        
    }


}

module.exports.getTeacher = async (req, res, next) => {

    try {

        await User.findById({
            _id: req.params.id
        }).populate('_profile', '-parent').exec(function (err, profile) {

            if ((req.user._id == req.params.id || req.user._id == profile.activeSchoolId[0]) && profile.activeStatus) {

                profile._profile.editable = true
            }
            return res.json(profile._profile)
        })



    }
    catch (err) {
        
        debug(err)
        return res.json({msg: message.error_messages.something_wrong})
    }
}

module.exports.updateTeacher = async (req, res, next) => {

    

}

module.exports.inviteTeacher = async (req, res, next) => {


    //create invitation link and send to teacher 
    // teacher will accept the invitation or reject the same

    try {

        const teacher = await findById(req.body.teacherID)

        if (teacher) {
            if (req.user._id != teacher.activeSchoolId[0]) {

                
                const hashedOTP =  await generatePasswrod(4);
                
                const newInvitation = new InvitationAuth({
                    email: req.body.teacherEmail,
                    teacherID: req.body.teacherID,
                    schoolID: req.body.schoolID,
                    hash:  hashedOTP.hash
                })
                res.locals.mailName = 'inviteTeacher'
                res.locals.otp = hashedOTP.password
                await newInvitation.save()
                res.json({Success: true, msg: message.constants.teacher.teacher_invited_successfully})
                next()
            }
            else {
                return res.json({msg: message.constants.teacher.teacher_exist_in_school})
            }
        }
        else {
            return res.json({msg: message.error_messages.teacherError.teacher_not_exist})
        }

    }
    catch (err) {

        debug(err)
        if(err.name === 'MongoError' && err.code === 11000) {
            return res.status(422).json({msg: message.error_messages.teacherError.teacher_already_invited })
        }
        else {
            return res.status(422).json({ msg: message.error_messages.something_wrong})
        }
        
    }


}