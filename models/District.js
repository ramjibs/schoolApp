const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DistrictSchema = new Schema({

    _id:{
        type: Schema.Types.ObjectId,
        required: true
    },
    districts:{
        type:[String],
        required: true
    }
})

module.exports = District = mongoose.model('district', DistrictSchema)