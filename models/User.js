const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'parent'],
        required: true,
    }, 
    
    activeStatus: {
        type: Boolean,
        required: true
    },
    activeSchoolId: {
        type: [String],
        required: function() { return this.activeStatus }
        
    },
    access: {
        type: Map,
        of: Boolean
    }




})





module.exports = User = mongoose.model('user', UserSchema);