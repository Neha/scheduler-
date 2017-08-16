const mongoose = require('mongoose');

const Appointments = mongoose.model('Appointments', {
    "first_name": String,
    "last_name": String,
    "email": String,
    "gender": String,
    "description": String,
    "profile_pic": String,
    "bookedWith" : {}
});

module.exports = Appointments;