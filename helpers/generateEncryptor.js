const bcryptjs = require('bcryptjs')
const { message } = require('../utils/message')

module.exports.generatePassword = async (size) => {

    const salt = await bcryptjs.genSalt(2);
    const password = size === 4 ? randomOtp(size) : randomLetter(size)
    const hash = await bcryptjs.hash(password, salt)

    return {
        password,
        hash
    }
}

module.exports.hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(2);
    const hash  = await bcryptjs.hash(password, salt)

    return {
        password,
        hash
    }
}

module.exports.decryptPassword = async (password, hash) => {


    return await bcryptjs.compare(password, hash)
}

module.exports.generateInvitation = async ( invitation ) => {

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(invitation, salt)

    return {
        hash
    };

}

function randomLetter(size) {

    const alphaNumeric = message.constants.alphaNumeric;
    var length = alphaNumeric.length;
    var password = ''

    for (i = 0; i < size; i++) {
        password += alphaNumeric.charAt(Math.floor(Math.random() * length))
    }

    return password;

}

function randomOtp(size) {

    const alphaNumeric = message.constants.alphaNumber;
    var length = alphaNumeric.length;
    var password = ''

    for (i = 0; i < size; i++) {
        password += alphaNumeric.charAt(Math.floor(Math.random() * length))
    }

    return password;

}


