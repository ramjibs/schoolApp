const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const CounterSchema = new Schema({

    _id: {
        type: String,
    },
    sequenceNumber: {
        type: Number,
    }
})

module.exports = Counter = mongoose.model('counter', CounterSchema)
