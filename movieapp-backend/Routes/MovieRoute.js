const express = require('express')
const router = express.Router()
const {getMovies, searchMovie} = require('../Controllers/MovieController')

router.get('/getmovies', getMovies )
router.get('/searchmovie', searchMovie)

module.exports = router