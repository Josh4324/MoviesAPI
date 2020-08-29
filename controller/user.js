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

        // create a token
        const token = jwt.sign({
                id: newUser._id,
                role: newUser.role
            },
            process.env.JWT_SECRET
        );

        // create data to be returned
        const data = {
            id: newUser._id,
            role: newUser.role,
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