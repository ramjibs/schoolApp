const keys = require('./config/Keys')
const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const helmet = require('helmet')
const debug = require('debug')('app:server')
const cors = require('cors')
const RegisterSchoolRouter = require('./routes/registerSchool')
const UserRouter = require('./routes/user')
const CheckTokenRouter = require('./routes/checktoken')
const SubjectRouter = require('./routes/Subject')
const TeacherRouter = require('./routes/Teacher')
const CategoryRouter = require('./routes/category')
const StateAndDistrictRouter = require('./routes/stateAndDistrict')
const passport = require('passport')
const check = require('./controllers/teacherController')
//make connection to the DB
require('./config/dbconfig/db.connection')

app.use(passport.initialize())
require('./config/passport')(passport);
app.use(helmet())
app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())
app.use(cors())
app.use('/api/checktoken',CheckTokenRouter)
app.use('/api/registration', RegisterSchoolRouter)
app.use('/api/users',UserRouter)
app.use('/api/subjects',SubjectRouter)
app.use('/api/teacher', TeacherRouter)
app.use('/api/locality', StateAndDistrictRouter)
app.use('/api/category', CategoryRouter)

// let port = 4000
app.listen(keys.PORT, () =>{
    debug(`Server started in Port ${keys.PORT}`)
})







