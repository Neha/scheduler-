// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const Users = require('./routes/users');
const Appointments = require('./routes/appointments');

mongoose.connect('mongodb://localhost/scheduler');

const app = express();

app.use(jwt({ secret: 'SECRETCODE'}).unless({path: ['/login']}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :stat' +
        'us :res[content-length] :response-time ms'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Serve static assets app.use(express.static(path.resolve(__dirname, '..',
// 'build'))); Always return the main index.html, so react-router render the
// route in the client

app.post('/login', Users.login);
app.get('/appointments', Appointments.getAppointments);
app.post('/appointments/book/:id', Appointments.bookAppointment);

module.exports = app;