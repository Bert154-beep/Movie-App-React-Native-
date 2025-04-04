const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String
    },
    release_data: {
        type: String
    },
    genres: [{
        id: Number,
        name: String
    }],
    vote_average: {
        type: Number,
        default: 0
    },
    poster_path: {
        type: String
    }
})

const MovieModel = mongoose.model('UserMovies', movieSchema)

module.exports = MovieModel