const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchoolSchema = new Schema({

    schoolName:{
        type: String,
        required: true,
    },
    email:{ 
        type: String,
        required: true,
         
    },
    registrationNumber:{
        type: String,
        required: true
    },
    licenseNumber:{
        type: String,
        required: true
    },
    acceptence:{
        type: String,
        default: "pending",
    },
    date:{
        type: Date,
        default: Date.now
    }


})

module.exports = RegisterSchool = mongoose.model('registerSchool', RegisterSchoolSchema);