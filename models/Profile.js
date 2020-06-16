const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QualificationSchema = new Schema({
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
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    }
},
    {
        _id: false,
        minimize: true
    }
)

const ExpereienceSchema = new Schema({
    schoolName: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
    },
    currentlyWorking: {
        type: Boolean,
        // required: true
    }
},
    {
        _id: false,
        minimize: true
    }
)
const ProfileSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    avatar:{
        type: String
    },

    editable: {
        type: Boolean,
        default: false,
    },
    contactNumber: [
        {
            contactNumber: Number,
        }
    ],
    state:{
        type: String
    },
    district:{
        type: String
    },
    address: {
        type: String,

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

        name: {
            type: String,
        },
        dob: {
            type: String,
        },
        gender: {
            type: String,
        },
        pancard: {
            type: String,
        },
        subjects:{
            type: [String]
        },
        teachingLevel:{
            type:[String]
        },
        qualification: [QualificationSchema],
        experience: [ExpereienceSchema],
        totalExperience: {
            year: {
                type: Number
            },
            month: {
                type: Number
            }

        },
        qualificationTimeline: [
            {
                startPeriod: {
                    type: String
                },
                endPeriod: {
                    type: String
                }
            }
        ],
        experienceTimeline: [
            {
                startPeriod: {
                    type: String,

                },
                endPeriod: {
                    type: String
                }
            }
        ],
        globalRange: {
            greaterThan: {
                type: String,
            },
            lesserThan: {
                type: String,
            },
            dob: {
                type: String,
            }
        }


        //Ratings : reference to ratings


    },
    parent: {

        fatherName:{
            type: String
        },
        motherName:{
            type: String
        },
        guardianName:{  
            type: String
        },
        fatherAge:{
            type: Number
        },
        motherAge:{
            type:Number
        },
        guardianAge:{
            type: String
        },
        students: [
            {

                type: Schema.Types.ObjectId,
                ref: 'student'


            }
        ]

    }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema)