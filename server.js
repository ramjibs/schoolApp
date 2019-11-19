import { PORT } from './config/Keys';
import express from 'express';
const app = express();
import { urlencoded, json } from 'body-parser';
import helmet from 'helmet';
const debug = require('debug')('app:server')
import cors from 'cors';
import RegisterSchoolRouter from './routes/registerSchool';
import UserRouter from './routes/user';
import CheckTokenRouter from './routes/checktoken';
import passport, { initialize } from 'passport';
//make connection to the DB
import './config/dbconfig/db.connection';

app.use(initialize())
require('./config/passport')(passport);
app.use(helmet())
app.use(urlencoded({ extended: false}))
app.use(json())
app.use(cors())
app.use('/api/checktoken',CheckTokenRouter)
app.use('/api/registration', RegisterSchoolRouter)
app.use('/api/users',UserRouter)


app.listen(PORT, () =>{
    debug(`Server started in Port ${PORT}`)
})

// const keys = require('./config/Keys')
// const express = require('express')
// const app = express();
// const bodyparser = require('body-parser')
// const helmet = require('helmet')
// const debug = require('debug')('app:server')
// const cors = require('cors')
// const RegisterSchoolRouter = require('./routes/registerSchool')
// const UserRouter = require('./routes/user')
// const CheckTokenRouter = require('./routes/checktoken')
// const passport = require('passport')
// //make connection to the DB
// require('./config/dbconfig/db.connection')







