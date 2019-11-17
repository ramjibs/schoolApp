const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailAuthSchema = new Schema({

    email:{
        type: String,
        unique: true
    },
    hash:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 60
    }
})

module.exports = EmailAuth = mongoose.model('emailAuth', EmailAuthSchema)