const api = require('../Config/axios')

const getMovies = async (req,res)=>{

    try {
        const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

        const movies = await api.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: {api_key: process.env.TMDB_API}
        })

        
        res.json(movies.data.results)
        
    } catch (error) {
        console.log("An Error Occured!", error )
    }

}


module.exports = {
    getMovies
}


