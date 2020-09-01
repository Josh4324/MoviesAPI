const axios = require("axios")
const jwt = require("jsonwebtoken");
const Movie = require("../model/movie");
const {
    successResMsg,
    errorResMsg
} = require("../utils/responseHandler");
const {
    response
} = require("express");


//get movies (200)
exports.getMovies = async (req, res) => {
    let req1 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
    let req2 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2")
    let req3 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=3")
    let req4 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=4")
    let req5 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=5")
    let req6 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=6")
    let req7 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=7")
    let req8 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=8")
    let req9 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=9")
    let req10 = axios.get("https://api.themoviedb.org/3/discover/movie?api_key=199acd0cba15f81898601f56a0e76fe1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=10")

    let arr = [req1, req2, req3, req4, req5, req6, req7, req8, req9, req10]
    axios.all(arr).then(axios.spread((...responses) => {
        const res1 = responses[0]
        const res2 = responses[1]
        const res3 = responses[2]
        const res4 = responses[3]
        const res5 = responses[4]
        const res6 = responses[5]
        const res7 = responses[6]
        const res8 = responses[7]
        const res9 = responses[8]
        const res10 = responses[9]

        const results = [...res1.data.results, ...res2.data.results, ...res3.data.results, ...res4.data.results, ...res5.data.results, ...res6.data.results, ...res7.data.results, ...res8.data.results, ...res9.data.results, ...res10.data.results, ]
        // return success response
        return successResMsg(res, 200, results);
    })).catch(err => {
        // return error response
        return errorResMsg(res, 500, err);
    });
}


exports.addMovie = async (req, res) => {
    let errCode
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.user_id;

        req.body.user = id

        const newMovie = await Movie.create(req.body);

        // return success response
        return successResMsg(res, 200, newMovie);
    } catch (err) {
        if (err._message === "Movie validation failed") {
            errCode = 423;
        } else {
            errCode = 500;
        }
        // return error response
        return errorResMsg(res, errCode, err);
    }
}

exports.editMovieRating = async (req, res) => {
    let errCode
    try {
        const {
            rating
        } = req.body
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.movie_id, {
            rating
        }, {
            new: true,
        })

        // return success response
        return successResMsg(res, 200, updatedMovie);
    } catch (err) {
        if (err._message === "Movie validation failed") {
            errCode = 423;
        } else {
            errCode = 500;
        }
        // return error response
        return errorResMsg(res, errCode, err);
    }
}

exports.removeMovie = async (req, res) => {
    try {
        // remove movie from list
        const removedMovie = await Movie.findByIdAndDelete({_id:req.params.movie_id});
        // return success response
        return successResMsg(res, 200, removedMovie);
    } catch (err) {
        // return error response
        return errorResMsg(res, 500, err);
    }
}