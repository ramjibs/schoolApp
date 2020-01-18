
const nodemailer = require("nodemailer");
const keys = require('../config/Keys')
const debug = require('debug')('app:mail')
const success = require('../views/registrationSuccess')
const denial = require('../views/registrationDenial')
const { emailtemplate } = require('../views/userCreation')
const { invitation } = require('../views/invitation')
const { changePass } = require('../views/changePassword');
const { message } = require('../utils/message')


const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: keys.mailID,
        pass: keys.mailPass
    }


});




module.exports.sendNotification = async (req, res) => {

    const mail = {}

    switch (res.locals.mailName) {
        case 'SchoolRegistered':
            mail.subject = message.constants.mail.registrationConfirmation
            mail.content = success.template
            break;
        case 'changePass':
            mail.subject = message.constants.mail.passChangeRequest;
            mail.content = changePass(res.locals.hash);
            break;
        case 'userCreation':
            mail.subject = message.constants.mail.userCreation
            mail.content = emailtemplate(res.locals.id, res.locals.password)
            break;
        case 'DeniedSchool':
            mail.subject = message.constants.mail.registrationDenial
            mail.content = denial.template
            break;
        case 'inviteTeacher':
            mail.subject = message.constants.mail.InvitateTeacher
            mail.content = invitation(res.locals.otp, res.locals.link, res.locals.schoolName)
            break;
            
        default:
            break;
    }
    
    Opts = {
        from: keys.mailID,
        to: req.body.email,
        subject: mail.subject,
        html: mail.content

    }

    await smtpTransport.sendMail(Opts, function (err, info) {

        if (err) {
            debug(err)
            return;
        }

        return;

    })

}
