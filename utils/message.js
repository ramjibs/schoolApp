

module.exports.message = {

    error_messages: {

        registerError: {
            email_id_exists: "Email Handle already exist in the Database",
            under_verification: "Your application is under verification please check Email",
            school_not_exist: "No School exist in the DB",
            school_denied: "School registration Denied"


        },
        userError: {

            user_exists: "User already exist in the Database",
            user_not_exist: "User not exist in the Database",
            user_not_active: "User is not part of any School",
            user_password_mistmatch: "Incorrect Password",
        },
        emailAuthError:{
            passChangeAlreadyRequested: "Password change request has been already requested please try again later",
            OtpExpired: "Your OTP has been expired",
            otpMisMatch: "Your OTP is not Valid"
        },
        subjectError: {
            noSubject: "There is no subject in Database Currently. Plesae add some."
        }
    },

    constants: {

        alphaNumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        alphaNumber: 'ABCDEFGHJKLMNOPQRSTUVWXYZ23456789abcdefghjkmnopqrstuvwxyz',

        registration: {
            registration_accepted: 'accepted',
            registration_denied: 'denied',
            registration_pending: 'pending',
            registration_success: 'Registration Applied Succesfully',

        },
        user: {

            user_created: "User sucessfully created",
            user_logged_in: "Succesfully logged in",
            user_password_changed: "Sucessfully Changed your Password"


        },

        mail: {

            registrationConfirmation: "Confirmation of Registration",
            registrationDenial: "Denial of Registration",
            userCreation: "Confirmation of User Creation",
            passChangeRequest: "Request for Password Change",
            passwordChangeOTPSent: "A password change OTP is sent to your email Id"
            
        }



    }



}