


 module.exports.findUser =  async function findUser(req) {


    // const user = await User.findOne({
    //     $or: [
    //         { _id: req.body.id },
    //         { email: req.body.email }
    //     ]
    // })
    let user = null
    let id = req.body.id || req.params.id



    try {
        if (id.includes("@")) {
            user = await User.findOne({
                email: id
            })
        }
        else {
            user = await User.findOne({
                _id: parseInt(id)
            })
        }
    }
    catch{
        user = null
    }

    return user;

}

module.exports.findByEmail =  async ( email ) => {

    let user = null; 

    try{
        user = await User.findOne({
            email: email
        })
    }
    catch( err ){
        debug(err)
    }

    return user;
}

module.exports.findById = async ( id ) => {
    let user = null;

    try{
        user = await User.findOne ({
            _id: id,
        })

    }
    catch(err){
        debug(err)
    }

    return user;
} 
