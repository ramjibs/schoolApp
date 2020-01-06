const debug = require('debug')('app:SubjectController')
const Subject = require('../models/Subject')
const { message } = require('../utils/message');

module.exports.getAllSubjects =  async (req, res) => {

    try{

        const subjectArray = await Subject.find({})

        if(subjectArray.length === 0) {
            return res.json({msg: message.error_messages.subjectError.noSubject})
        }

        return res.json(subjectArray)

    }
    catch( err ){
        debug(err)
    }
}

module.exports.addSubjects = async (req, res) => {

    try {

        const subjectArray = req.body;
        debug(req.body)
        Subject.insertMany(subjectArray, function(err, docs){
            res.json()
            debug(docs)
        })

    }
    catch(err){

    }
}