//mongoos for connecting mongoDB
const mongoose = require('mongoose')
//keys for db connection string
const keys = require('../Keys')
//debugger for logging console msg in dev environment
const debug = require('debug')('app:db')

module.exports = mongoose.connect(keys.mongoURI, { useNewUrlParser: true})
    .then(() => debug("Connected to MongoDB Successfully"))
    .catch(err => debug(err)); 



