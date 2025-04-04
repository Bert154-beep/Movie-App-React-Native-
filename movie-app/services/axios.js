import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const api = axios.create({
    baseURL: "http://192.168.1.102:3000",
    withCredentials: true
})

api.interceptors.request.use(async (config)=>{
    const token = await AsyncStorage.getItem('userToken')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api