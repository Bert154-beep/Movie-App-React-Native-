import api from '../services/axios'



export const fetchMovies = async ()=>{
    try {
        const response = await api.get('/Movies/getmovies')
        return response.data
    } catch (error) {
        console.log(error)
    }
}