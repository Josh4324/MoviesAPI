const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie");
const auth = require("../middleware/auth");

// get all movies
router.get('/', auth.authentication(), movieController.getMovies);
// add a movie to user list
router.post('/', auth.authentication(), movieController.addMovie);




module.exports = router;