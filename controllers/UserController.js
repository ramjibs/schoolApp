const User = require('../models/User')
const EmailAuth = require('../models/EmailAuth');
const debug = require('debug')('app:userController')
const { generateUniqueUserId } = require('../helpers/generateUniqueUserId')
const { generatePassword, decryptPassword, hashId } = require('../helpers/generatePassword')
const { message } = require('../utils/message');
const jwt = require('jsonwebtoken')
const keys = require('../config/Keys')

// To Add a new User - School Parent Teacher
module.exports.addUser = async (req, res, next) => {

    if (req.body.acceptence && req.body.acceptence === message.constants.registration.registration_denied) {

        res.locals.denial = true;
        res.json({ msg: message.error_messages.registerError.school_denied })
        next()


    }
    else {

        try {

            const user = await findUser(req)

            if (user) {
                return res.json({ msg: message.error_messages.userError.user_exists })
            }

            else {

                const id = await generateUniqueUserId()
                const passGenearated = await generatePassword(8)

                const newUser = new User({
                    _id: id,
                    email: req.body.email,
                    password: passGenearated.hash,
                    role: req.body.role,
                    activeSchoolId: req.body.id || id,
                    activeStatus: true

                })

                await newUser.save()

                res.locals.userCreation = true
                res.locals.id = id
                res.locals.password = passGenearated.password
                res.json({ msg: message.constants.user.user_created })

                next()

            }

        }
        catch (err) {

            debug(err)

        }

    }

}

// Helps to Login User
module.exports.loginUser = async (req, res) => {

    try {

        const user = await findUser(req)

        if (!user) {
            return res.json({ msg: message.error_messages.userError.user_not_exist })
        }
        else {
            const passMatch = await decryptPassword(req.body.password, user.password)

            if (passMatch) {

                if (user.activeStatus) {
                    const payload = {
                        id: user._id
                    }

                    jwt.sign(payload, keys.secretOrPrivateKey, { expiresIn: 7200 }, (err, token) => {
                        res.json({
                            msg: message.constants.user.user_logged_in,
                            token: 'Bearer ' + token
                        })

                    })

                } else {
                    res.json({ msg: message.error_messages.userError.user_not_active })
                }

            }
            else {
                res.json({ msg: message.error_messages.userError.user_password_mistmatch })

            }
        }

    }
    catch (err) {
        debug(err)
    }

}

//To Change Password Request
module.exports.requestChangePassword = async (req, res, next) => {

    try {

        const user = await findUser(req)

        if (!user) {
            return res.json({ msg: message.error_messages.userError.user_not_exist })
        }

        const hashGenearated = await generatePassword(4)

        const newEmailAuth = new EmailAuth({
            email: user.email,
            hash: hashGenearated.hash
        })

        await newEmailAuth.save()

        req.body.email = user.email
        res.locals.changePass = true;
        res.locals.hash = hashGenearated.password

        res.json({ msg: message.constants.mail.passwordChangeOTPSent, email: user.email })
        next();
    }
    catch (err) {
        return res.json({ msg: message.error_messages.emailAuthError.passChangeAlreadyRequested })
    }
}

module.exports.changePassword = async (req, res, next) => {

    try {

        const auth = await changeRequestVerifed(req, res)

        if (auth === message.error_messages.emailAuthError.OtpExpired || auth === message.error_messages.emailAuthError.otpMisMatch) {
            return res.json({ msg: auth })
        }

        if (auth) {
            const user = await User.findOneAndUpdate({
                email: req.body.email
            },
                {
                    password: req.body.password
                },
                {
                    new: true,
                    useFindAndModify: false
                })

            res.json({ msg: message.constants.user.user_password_changed })

        }


    }
    catch (err) {

    }

}

changeRequestVerifed = async (req, res) => {

    try {

        const auth = await EmailAuth.findOne({
            email: req.body.email
        })

        const otpMatch = await decryptPassword(req.body.otp, auth.hash)

        if (otpMatch) {
            const auth = await EmailAuth.findOneAndDelete({
                email: req.body.email
            })
            return true;
        }
        else {
            return message.error_messages.emailAuthError.otpMisMatch;
        }

    }
    catch (err) {

        return message.error_messages.emailAuthError.OtpExpired
    }
}

async function findUser(req) {

    const user = await User.findOne({
        $or: [
            { _id: req.body.id },
            { email: req.body.email }
        ]
    })

    return user;

}



