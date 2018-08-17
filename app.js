const express = require('express')
const managerRouter = require('./route/managerRouter')
const studentRouter = require('./route/studentRouter')
const bodyParser = require('body-parser')
const session = require('express-session')

let app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     secure: true
    // }
}))

app.use(express.static('static'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/manage', managerRouter)
app.use('/student', studentRouter)

app.listen(3000, () => {
    console.log('Server is running at port:3000');
})