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
        type: Number,
        ref: 'user',
        
    },
    schoolHistory:[
        {

            schoolId:{
                type: Number,
                ref: 'user',
            },
            from:{
                type: String,
                required: true
            },
            to:{
                type: String
            }
           
            
        },
        
    ],
    access: {
        type: Map,
        of: Boolean
    },
    _profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
    }




},
{
    minimize: true
})





module.exports = User = mongoose.model('user', UserSchema);