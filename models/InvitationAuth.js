const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvitationAuthSchema = new Schema({

    email:{
        type: String,
        required: true
    },
    teacherID: {
        type: String,
        required: true
    },
    schoolID: {
        type: String,
        required: true
    },
    hash:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 360
    }
})

InvitationAuthSchema.index({teacherID: 1, schoolID: 1}, { unique: true})

module.exports = InvitationAuth = mongoose.model('invitationauth', InvitationAuthSchema)