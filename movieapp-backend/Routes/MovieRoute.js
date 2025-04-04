const express = require('express')
const router = express.Router()
const {getMovies} = require('../Controllers/MovieController')

router.get('/getmovies', getMovies )

module.exports = router