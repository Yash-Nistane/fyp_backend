const User = require("../model/user");

exports.signup = (req, res) => {
    let { firstName, lastName, email, password, confirmPassword, imageURL } = req.body;
    if (password != confirmPassword) {
        return res.status(400).json({ message: "passwords do not match" });
    }
    User.findOne({ email: email }, function (err, user) {
        if (user) {
            return res.status(400).json({ auth: false, message: "user already exists" });
        }

        const newuser = new User({
            firstName,
            lastName,
            email,
            password,
            imageURL
        })

        newuser.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: err });
            }
            res.status(200).json({
                message: doc
            });
        });
    });
}

// Sample data to test
// {
//     "firstName": "Shruti",
//     "lastName": "Solani",
//     "email":"abc123@gmail.com",
//     "password": "12345",
//     "confirmPassword": "12345",
//     "imageURL": "https://unsplash.com/photos/ZVprbBmT8QA"
// }

exports.signin = (req, res) => {
    console.log(req.body);
    let token = req.cookies.auth;
    User.findByToken(token, (err, user) => {
        if (err) return res(err);
        if (user) return res.status(400).json({
            error: true,
            message: "You are already logged in"
        });

        else {
            User.findOne({ 'email': req.body.email }, function (err, user) {
                if (!user) return res.json({ isAuth: false, message: ' Auth failed ,email not found' });

                user.comparepassword(req.body.password, (err, isMatch) => {
                    if (!isMatch) return res.json({ isAuth: false, message: "password doesn't match" });

                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        res.cookie('auth', user.token).json({
                            isAuth: true,
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            imageURL:user.imageURL
                        });
                    });
                });
            });
        }
    });
}

// Sample data to test 
// {
//     "email":"xyz@gmail.com",
//     "password": "12345"
// }


exports.signout = (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    });
}

exports.viewProfile = (req, res) => {
    const { userId } = req.body;
    User.findOne({ _id: userId }, function (err, user) {
        if (err) return res.status(400).json({ message: err });

        if (user) return res.status(200).json({
            message: {
                id: user._id,
                email: user.email,
                name: user.firstName + " " + user.lastName,
                profilePic: user.imageURL
            }
        })
    })
    // res.json({
    //     isAuth: true,
    //     id: req.user._id,
    //     email: req.user.email,
    //     name: req.user.firstName + req.user.lastName,
    //     profilePic: req.user.imageURL
    // })
}