const mongoose = require("mongoose");


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide the movie title"],
        trim: true,
    },
    rating: {
        type: Number,
        required: [true, "Please provide the movie rating"],
        trim: true,
        validate: {
            validator: function (rating) {
                return (rating >= 1 && rating <= 5)
            },
            message: "Please enter a valid rating between 1 (inclusive) and 5 (inclusive)"
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie