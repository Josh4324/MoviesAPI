const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie");
const auth = require("../middleware/auth");

// get all movies


// add a movie to user list
router.get('/', auth.authentication(), movieController.getMovies);
// get all movies on list
router.get('/list', auth.authentication(), movieController.getList);
// add a movie to user list
router.post('/', auth.authentication(), movieController.addMovie);
// edit movie rating
router.patch('/:movie_id', auth.authentication(), movieController.editMovieRating);
// remove movie from list
router.delete('/:movie_id', auth.authentication(), movieController.removeMovie);



module.exports = router;