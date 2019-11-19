
const nodemailer = require("nodemailer");
// const keys = require('../config/Keys')
const debug = require('debug')('app:mail')
const success = require('../views/registrationSuccess')
const denial = require('../views/registrationDenial')
const { emailtemplate } = require('../views/userCreation')
const { changePass } = require('../views/changePassword');
const { message } = require('../utils/message')


const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ramji.balusudarsan@gmail.com",
        pass: "r26061995"
    }


});




module.exports.sendNotification = async (req, res) => {

    const mail = {}
    
    
    if (res.locals.success) {

        mail.subject = message.constants.mail.registrationConfirmation
        mail.content = success.template

    }
    else if (res.locals.denial) {

        mail.subject = message.constants.mail.registrationDenial
        mail.content = denial.template
    }
    else if (res.locals.userCreation) {
        
        mail.subject = message.constants.mail.userCreation
        mail.content = emailtemplate(res.locals.id, res.locals.password)

    }
    else if(res.locals.changePass){

        mail.subject = message.constants.mail.passChangeRequest;
        mail.content = changePass(res.locals.hash);
    }




    Opts = {
        from: "ramji.balusudarsan@gmail.com",
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
