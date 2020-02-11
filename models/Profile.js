const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId
    },

    editable: {
        type: Boolean,
        default: false,
    }, 
    name: { 
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    school: {
        registrationNumber: {
            type: String,
            
        },
        licenseNumber: {
            type: String,
           
        }
    },
    teacher: {

        qualification: [
            {
                title: {
                    type: String,
                    required: true
                },
                branch: {
                    type: String,
                    required: true
                },
                institution: {
                    type: String,
                    required: true
                },
                from: {
                    type: Date,
                    required: true
                },
                to: {
                    type: Date,
                    required: true
                },
                score: {
                    type: String,
                    required: true 
                }

            }
        ],

        experience: [
            {
                schoolName: {
                    type: String,
                    required: true
                },
                from: {
                    type: Date,
                    required: true
                },
                to: {
                    type: Date,
                },
                subjectsThought: {
                    type: [String],
                    required: true
                },
                currentlyWorking: {
                    type: Boolean,
                    required: true
                }
            }
            

        ],
        totalExperience: {
            type: Number,

        }

        //Ratings : reference to ratings


    },
    parent: {
        students: [
            {
                studentId: {
                    type: Schema.Types.ObjectId,
                    ref: 'student'
                }

            }
        ]

    }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema)