const debug = require('debug')('app:checkTokenController')

module.exports.checkToken = async (req, res, next) => {
    setTimeout(res.status(200).json({msg: true}),2000)
    
    // next()
}