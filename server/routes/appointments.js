const Appointments = require("../models/appointments");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const getAppointments = (req, res) => {

    Appointments
    .where('bookedWith').equals(undefined)
    .select("-password -bookedWith")
        .find({})
        .exec(function (err, appointments) {
            if (appointments.length === 1) {
                res.send({
                    data: {
                        appointments: appointments
                    },
                    status: {
                        error: false
                    }
                });
            } else {
                res.send({
                    status: {
                        error: true,
                        message: "invalid user"
                    }
                });
            }

        });

}

const bookAppointment = (req, res) => {

        console.log(req.body);

        // Appointments
        // .update({ _id : req.params.id }, { bookedWith : { name : "dadd" } })
        // // .find({username: username, password: password}) .and([     { $or: [{a: 1},
        // // {b: 1}] } ]) .select("-password")
            
        //     .exec(function (err, appointments) {
        //         if (appointments.length === 1) {
        //             res.send({
        //                 data: {
        //                     appointments: appointments
        //                 },
        //                 status: {
        //                     error: false
        //                 }
        //             });
        //         } else {
        //             res.send({
        //                 status: {
        //                     error: true,
        //                     message: "invalid user"
        //                 }
        //             });
        //         }
    
        //     });
    
    }

module.exports = {
    getAppointments,
    bookAppointment
}