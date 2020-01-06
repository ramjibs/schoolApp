const mongoose = require('mongoose')
const Schema = mongoose.Schema


const classroomSchema = new Schema ({
    class:{
        type: String,
        content: [{
            section: {
                type: String,
                required: true,
                unique: true
            },
            presentees: {
                type: Number,
                default: 0,
            },
            studentStrength: {
                type: Number,
                default: 0,
            },
            classTeacher: {
                type: String
            }
        }
            

        ]
    }
    
})