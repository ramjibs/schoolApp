const debug = require('debug')('app:checkTokenController')

module.exports.checkToken = async (req, res, next) => {
    res.status(200).json(req.user)
    
    // next()
}