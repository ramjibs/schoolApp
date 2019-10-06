const keys = require('./config/Keys')
const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const helmet = require('helmet')
const debug = require('debug')('app:server')
const cors = require('cors')
const RegisterSchoolRouter = require('./routes/registerSchool')
const UserRouter = require('./routes/user')
//make connection to the DB
require('./config/dbconfig/db.connection')

app.use(helmet())
app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())
app.use(cors())


app.use('/api/registerSchool', RegisterSchoolRouter)
app.use('/api/user',UserRouter)


app.listen(keys.PORT, () =>{
    debug(`Server started in Port ${keys.PORT}`)
})








