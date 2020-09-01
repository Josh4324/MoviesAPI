const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie");




router.get('/', movieController.getMovies);




module.exports = router;