const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide Your first name"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Please provide Your last name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },
            message: "Please enter a valid email"
        },
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 2,
        trim: true,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "Please provide password"],
        trim: true,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Please, Passwords are not the same",
        },
    },
});

// save password when user is created
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

// checks if password is correct
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;