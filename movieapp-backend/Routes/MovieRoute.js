const express = require('express')
const router = express.Router()
const {getMovies, searchMovie, getMoviesById} = require('../Controllers/MovieController')
const {AuthMiddleware} = require('../Middleware/AuthMiddleware')

router.get('/getmovies', getMovies )
router.get('/searchmovie', searchMovie)
router.get('/getMovieById', getMoviesById)

module.exports = router