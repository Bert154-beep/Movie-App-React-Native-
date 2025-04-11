const api = require('../Config/axios')

const getMovies = async (req, res) => {

    try {
        const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

        const response = await api.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: { api_key: process.env.TMDB_API }
        })

        const movies = response.data.results
        if (!movies) {
            return res.json({
                error: "No Movies Found!"
            })
        } else {
            res.json(movies)
        }
    } catch (error) {
        console.log("An Error Occured!", error)
    }

}

const searchMovie = async (req, res) => {

    try {
        const { query } = req.query
        const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
        const response = await api.get(`${TMDB_BASE_URL}/search/movie`, {
            params: { api_key: process.env.TMDB_API, query }
        })
        const movies = response.data.results
        if (!movies) {
            return res.json({
                error: "No Movies Found!"
            })
        } else {
            return res.json(movies)
        }
    } catch (error) {
        console.log("An Error Occured!", error)
    }
}



module.exports = {
    getMovies,
    searchMovie
}


