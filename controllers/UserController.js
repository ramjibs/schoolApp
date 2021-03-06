const User = require('../models/User')
const EmailAuth = require('../models/EmailAuth');
const debug = require('debug')('app:userController')
const { generateUniqueUserId } = require('../helpers/generateUniqueUserId')
const { generatePassword, decryptPassword, hashPassword } = require('../helpers/generateEncryptor')
const { message } = require('../utils/message');
const jwt = require('jsonwebtoken')
const keys = require('../config/Keys')
const { findByEmail, findUser } = require('../helpers/findUser')
// To Add a new User - School Parent Teacher
module.exports.addUser = async (req, res, next) => {

    if (req.body.acceptence && req.body.acceptence === message.constants.registration.registration_denied) {

        res.locals.mailName = 'deniedSchool';
        res.json({ msg: message.error_messages.registerError.school_denied })
        next()


    }
    else {

        try {

            const user = await findByEmail(req.body.email)

            if (user) {
                return res.json({ msg: message.error_messages.userError.user_exists })
            }
            else {

                const id = await generateUniqueUserId()
                const passGenearated = await generatePassword(8)
                let newUser = null
               
                
                switch (req.body.role) {
                    case 'admin':
                        let obj = {
                            _id: id,
                            email: req.body.email,
                            password: passGenearated.hash,
                            role: req.body.role,
                            activeStatus: true,
                            access :{
                                create: true,
                                read: true,
                                update: true,
                                delete: true
                            }
                        }
                        newUser = new User(obj)
                        
                        break;

                    case 'teacher':
                        newUser = new User({
                            _id: id,
                            email: req.body.email,
                            password: passGenearated.hash,
                            role: req.body.role,
                            activeStatus: true,
                            activeSchoolId: req.user._id,
                            access:{
                                create: true,
                                read: true,
                                update: true,
                                delete: false
                            }
                        })
                        break;
                
                    default:
                        break;
                }
               


                await newUser.save()
                res.locals.mailName = 'userCreation'
                res.locals.id = id
                res.locals.password = passGenearated.password
                debug(id)
                debug(passGenearated.password)
                res.json({ msg: message.constants.user.user_created })

                next()

            }






        }
        catch (err) {

            debug(err)
            return 
        }

    }

}

// Helps to Login User 
module.exports.loginUser = async (req, res) => {

    try {
        const user = await findUser(req)

        if (!user) {
            return res.status(403).json({ msg: message.error_messages.userError.user_not_exist })
        }
        else {
            const passMatch = await decryptPassword(req.body.password, user.password)

            if (passMatch) {
                
                let userObj = {
                    _id: user._id,
                    activeSchoolId: user.activeSchoolId,
                    email: user.email,
                    role: user.role,
                    access: user.access,
                    _profile: user._profile,
                    activeStatus: user.activeStatus
                }
                if (user.activeStatus) {
                    const payload = {
                        _id: user._id
                    }
                    
                    jwt.sign(payload, keys.secretOrPrivateKey, { expiresIn: 7200 }, (err, token) => {
                        res.json({
                            msg: message.constants.user.user_logged_in,
                            token: 'Bearer ' + token,
                            user: userObj
                        })

                    })

                } else {
                    res.status(403).json({ msg: message.error_messages.userError.user_not_active })
                }

            }
            else {
                res.status(403).json({ msg: message.error_messages.userError.user_password_mistmatch })

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
            return res.status(403).json({ msg: message.error_messages.userError.user_not_exist })
        }

        const hashGenearated = await generatePassword(4)

        const newEmailAuth = new EmailAuth({
            email: user.email,
            hash: hashGenearated.hash
        })

        await newEmailAuth.save()

        req.body.email = user.email
        res.locals.mailName = 'changePass';
        res.locals.hash = hashGenearated.password

        res.json({ msg: message.constants.mail.passwordChangeOTPSent, email: user.email })
        next();
    }
    catch (err) {
        return res.status(403).json({ msg: message.error_messages.emailAuthError.passChangeAlreadyRequested })
    }
}

module.exports.changePassword = async (req, res, next) => {

    try {

        const auth = await changeRequestVerifed(req, res)

        if (auth === message.error_messages.emailAuthError.OtpExpired || auth === message.error_messages.emailAuthError.otpMisMatch) {
            return res.status(403).json({ msg: auth })
        }

        if (auth) {
            const hashedPassword = await hashPassword(req.body.password)
            const user = await User.findOneAndUpdate({
                email: req.body.id
            },
                {
                    password: hashedPassword.hash
                },
                {
                    new: true,
                    useFindAndModify: false
                })

            // res.json({ changePassMsg: message.constants.user.user_password_changed })
            next()
        }


    }
    catch (err) {
        debug(err)
        return res.status(403).json({ msg: 'Something went wrong' })
    }

}

changeRequestVerifed = async (req, res) => {

    try {

        const auth = await EmailAuth.findOne({
            email: req.body.id
        })


        const otpMatch = await decryptPassword(req.body.otp, auth.hash)

        if (otpMatch) {
            const auth = await EmailAuth.findOneAndDelete({
                email: req.body.id
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






