const debug = require('debug')('app:categoryController')
const Category = require('../models/Category')

module.exports.addCategory = async (req, res, next) => {
  
   try {

        const newCat = new Category({
            categoryName: req.body.categoryName,
            description: req.body.description
        })

        newCat.save()

        return res.status(200).json({msg: 'Success'})
       
   } catch (error) {
        debug(error)
   }
    
}

module.exports.getCategories = async (req, res) =>{

    try {

        const category =  await Category.find({})

        return res.status(200).json(category)
        
    } catch (error) {

        debug(error)
        
    }
}