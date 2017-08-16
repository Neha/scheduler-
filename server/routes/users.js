const UserSchema = require("../models/users");
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const login = (req, res) => {

    if (!req.body) {
        res.send({
            status: {
                error: true,
                message: "invalid request params"
            }
        });
    }
        
    const {username, password} = req.body;

    UserSchema
        .find({username: username, password: password})
        .select("-password")
        .exec(function (err, users) {
            if (users.length === 1) {
                user = users[0];
                res.send({
                    data : {
                        user : user,
                        token: jwt.sign(user, "SECRETCODE")
                    },
                    status: {
                        error: false,
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

module.exports = {
    login
}