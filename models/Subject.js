const debug = require('debug')('app:SubjectSchema')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({

   
            subjectName: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true
            }
       
})

SubjectSchema.index({subjectName: 1}, {type: -1})

// SubjectSchema.on('index', function(err) {
//     debug(err)
// })


module.exports = Subject = mongoose.model('subject', SubjectSchema)