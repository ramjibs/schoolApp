const Counter = require('../models/Counter')
const debug = require('debug')('app:genUniqueUserIdr')


module.exports.generateUniqueUserId = async () => {


    const counter = await Counter.findOneAndUpdate({ _id: 'unique_user_id' },
        {
            $inc: { sequenceNumber: 1 },
        },
        {
            new: true,
            useFindAndModify: false
        }
    )


    return counter.sequenceNumber


}