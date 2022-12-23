const express = require('express')
const path = require('path')
const admin = require('./route/admin')
const session = require('express-session');


require('./model/connect')
const app = express()
app.use(express.urlencoded({
    extended: true
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'secret key'
}))
app.use('/admin', require('./middleware/guard'))
app.use('/admin', admin)

app.listen(8080, () => {
    console.log('Web Service Started');
})
