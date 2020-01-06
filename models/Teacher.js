const mongoose = require('mongoose');
const Shcema = mongoose.Schema;

const teacherSchema = new Schema({
    
    

    experience:{
        type: Number,
        required: true
    },
    subjectKnow:[

    ]
})