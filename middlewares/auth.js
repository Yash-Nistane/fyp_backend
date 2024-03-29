const User = require("../model/user");

let auth = (req, res, next) => {
    let token = req.cookies.auth;
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({
            message: "user not logged in"
        })

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };