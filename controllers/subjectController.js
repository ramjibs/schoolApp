const debug = require('debug')('app:SubjectController')
const Subject = require('../models/Subject')
const { message } = require('../utils/message');

module.exports.getAllSubjects =  async (req, res) => {

    try{

        const subjectArray = await Subject.find({})
       
        if(subjectArray.length === 0) {
            return res.status(400).json({msg: message.error_messages.subjectError.noSubject})
        }

        return res.status(200).json(subjectArray)

    }
    catch( err ){
        debug(err) 
    }
}

module.exports.addSubjects =  (req, res) => {

    try {

        const subjectArray = req.body;
        
        Subject.insertMany(subjectArray, function(err, docs){
            if(err){
                debug(err)
            }

            return res.json({msg: message.constants.subject.addSucessfull})
                   
                })



    }
    catch(err){

    }
}