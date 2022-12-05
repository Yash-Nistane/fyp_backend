const User = require("../model/user");

exports.signup = (req, res) => {

    console.log(req.body);
    User.findOne({username: req.body.username}).exec(async (err, user) => {

        if(user){
            return res.status(400).json({
                error: "User already registered",
            });
        }

        const {name, username, password} = req.body;

        const _user = new User({
            name,
            username,
            password
        });

        _user.save((error, user) => {

            if(error){
                return res.status(400).json({
                    error: "something went wrong",
                });
            }

            if(user){
                const {name, username} = user;
                return res.status(201).json({
                    user: {name, username}
                });
            }
        })
    })
}

