const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({

    subject: [
        {
            subjectName: {
                type: String,
                required: true,
            },
            standards: {
                type: [Schema.Types.ObjectId],
                ref: 'standard',
                required: true
            },
            sections: {
                type: [Schema.Types.ObjectId],
                ref: 'section',
                required: true
            }
        }
    ]
})

module.exports = Subject = mongoose.model('subject', SubjectSchema)