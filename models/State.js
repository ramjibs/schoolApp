const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StateSchema = new Schema({

    _id:{
        type: Schema.Types.ObjectId,
        required: true
    },
    stateName:{
        type: String,
        required: true
    },
    _districts:{
        type:Schema.Types.ObjectId,
        ref:'district',
        required: true
    }
})

module.exports = State =  mongoose.model('state', StateSchema)