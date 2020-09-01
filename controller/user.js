const User = require('../model/user');
const jwt = require("jsonwebtoken");
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");

// Signup Controller
exports.signUp = async (req, res) => {
    let errCode
    try {
        // get user with email
        const user = await User.findOne({
            email: req.body.email
        });

        // check if user exists and return error if user already exists
        if (user) {
            return errorResMsg(res, 423, "This user already exists");
        }

        // create new user if user does not exists
        const newUser = await User.create(req.body);

        // create user token
        const token = jwt.sign({
                user_id: newUser._id,
            },
            process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
              }
        );

        // create data to be returned
        const data = {
            id: newUser._id,
            token
        }
        // return succesfull response
        return successResMsg(res, 201, data);
    } catch (err) {
        if (err._message === "User validation failed"){
            errCode = 423;
        }else {
            errCode = 500;
        }
        // return error response
        return errorResMsg(res, errCode, err);
    }
}


exports.logIn = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        // check if user exists and select password
        const user = await User.findOne({
            email
        }).select("+password");

        // check if user exists and if the password is correct
        if (!user || !(await user.correctPassword(password, user.password))) {
            // return error message if password is wrong
            return errorResMsg(res, 401, "Incorrect email or password");
        }

        // create user token
        const token = jwt.sign({
                user_id: user._id,
            },
            process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
              }
        );

         // create data to be returned
        const data = {
            id: user._id,
            token
        }
        // return succesfull response
        return successResMsg(res, 200, data);

    } catch (err) {
        // return error response
        return errorResMsg(res, 500, err);
    }
}
