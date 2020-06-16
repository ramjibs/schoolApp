const User = require('../models/User')
const Profile = require('../models/Profile')
const debug = require('debug')('app:TeacherController')
const { message } = require('../utils/message')
const { findByEmail, findUser, findById } = require('../helpers/findUser')
const mongoose = require('mongoose')
// const { generatePassword, decryptPassword } = require('../helpers/generateEncryptor')
const EmailAuth = require('../models/EmailAuth')
const InvitationAuth = require('../models/InvitationAuth')

module.exports.addTeacherProfile = async (req, res, next) => {

    try {

        const user = await findByEmail(req.body.email);



        let totalExperience = getTeahcerTotalExperience(req.body.experienceTimeline)
        const profile = new Profile({
            _id: new mongoose.Types.ObjectId(),
            avatar: 'String',
            contactNumber: req.body.contactDetails,
            state: req.body.state,
            district: req.body.district,
            address: req.body.address,
            teacher: {
                name: req.body.name,
                dob: req.body.dob,
                gender: req.body.gender,
                pancard: req.body.pancard,
                subjects: req.body.subjects,
                teachingLevel: req.body.teachingLevel,
                qualification: req.body.qualification,
                experience: req.body.experience,
                qualificationTimeline: req.body.qualificationTimeline,
                experienceTimeline: req.body.experienceTimeline,
                globalRange: req.body.globalRange,
                totalExperience: {
                    year: totalExperience.year,
                    month: totalExperience.month
                }
            },

        })

        await profile.save()


        await User.findOneAndUpdate({
            _id: user._id
        },
            {
                schoolHistory: [
                    {
                        schoolId: req.user._id,
                        from: totalExperience.currentSchoolFrom
                    }
                ],
                _profile: profile._id
            },
            {
                new: true,
                useFindAndModify: false
            }
        )


        next();


    }
    catch (err) {
        debug(err)
        return res.json({ msg: message.error_messages.something_wrong })

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
        return res.json({ msg: message.error_messages.something_wrong })
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


                const hashedOTP = await generatePasswrod(4);

                const newInvitation = new InvitationAuth({
                    email: req.body.teacherEmail,
                    teacherID: req.body.teacherID,
                    schoolID: req.body.schoolID,
                    hash: hashedOTP.hash
                })
                res.locals.mailName = 'inviteTeacher'
                res.locals.otp = hashedOTP.password
                await newInvitation.save()
                res.json({ Success: true, msg: message.constants.teacher.teacher_invited_successfully })
                next()
            }
            else {
                return res.json({ msg: message.constants.teacher.teacher_exist_in_school })
            }
        }
        else {
            return res.json({ msg: message.error_messages.teacherError.teacher_not_exist })
        }

    }
    catch (err) {

        debug(err)
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(422).json({ msg: message.error_messages.teacherError.teacher_already_invited })
        }
        else {
            return res.status(422).json({ msg: message.error_messages.something_wrong })
        }

    }


}
function getTeahcerTotalExperience(experienceArray) {
    let totalExpereince = {
        year: Number,
        month: Number,
        currentSchoolFrom: String
    }
    let len = experienceArray.length;
    let minimum = null
    let maximum = null
    let minExp = null
    let maxExp = null
    for (let index = 0; index < len; index++) {

        let perTimeLineObj = experienceArray[index];

        if (perTimeLineObj.endPeriod !== null) {

            if (minimum === null && maximum === null) {
                minimum = perTimeLineObj.startPeriod
                maximum = perTimeLineObj.endPeriod
            }
            else {

                if (perTimeLineObj.startPeriod < minimum) {
                    minimum = perTimeLineObj.startPeriod
                }

                if (perTimeLineObj.endPeriod > maximum) {
                    maximum = perTimeLineObj.endPeriod
                }


            }

        }
        else {
            totalExpereince.currentSchoolFrom = perTimeLineObj.startPeriod
        }

    }

    minExp = new Date(minimum)
    maxExp = new Date(maximum)

    totalExpereince.year = maxExp.getFullYear() - minExp.getFullYear()
    if (totalExpereince.year < 1) {
        totalExpereince.month = ((totalExpereince.year * 12) + (maxExp.getMonth() - minExp.getMonth()))

    }
    else {
        totalExpereince.month = ((totalExpereince.year * 12) + (maxExp.getMonth() - minExp.getMonth())) % (totalExpereince.year * 12)

    }

    return totalExpereince
}