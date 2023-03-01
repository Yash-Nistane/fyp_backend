// const user = require("../model/user");
const User = require("../model/user");

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (err, user) => {
        if (user) {
            return res.status(400).json({
                error: "User already registered",
            });
        }

        const { firstName, lastName, email, password, imageURL } = req.body;

        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            imageURL
        })

        console.log(_user);
        _user.save((error, user) => {

            if (error) {
                return res.status(400).json({
                    error: error,
                });
            }

            if (user) {
                return res.status(201).json({ message: "User successfully registered" });
            }
        })
    })
}

// Sample data to test
// {
//     "firstName": "Shruti",
//     "lastName": "Solani",
//     "email":"xyzd@gmail.com",
//     "password": "12345",
//     "imageURL": "https://unsplash.com/photos/ZVprbBmT8QA"
// }


exports.signin = (req, res) => {

    const {
        email,
        password
    } = req.body;

    User.findOne({ email: email }).exec((error, user) => {
        if (user) {
            //check if password matches
            const result = password === user.password;
            if (result) {
                res.status(201).json({ message: "user signed in" });
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    });

}

// Sample data to test 
// {
//     "email":"xyz@gmail.com",
//     "password": "12345"
// }