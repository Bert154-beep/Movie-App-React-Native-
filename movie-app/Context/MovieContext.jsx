import { createContext, useState } from "react";
import { Platform, ToastAndroid } from 'react-native'
import api from '../services/axios'

export const MovieContext = createContext({})

export function MovieProvider({children}){

    const fetchMovies = async ()=>{
        try {
            const response = await api.get('/Movies/getmovies')
            if(!response){
                if(Platform.OS == 'android' || Platform.OS == 'ios'){
                    ToastAndroid.show(response.error, ToastAndroid.SHORT) 
                }
            } else{
                return response.data
            }
        } catch (error) {
            console.log('An Error Occured!', error)
        }
    }

    const SearchMovies = async (query)=>{
        try {
            const response = await api.get(`/Movies/searchmovie`, {
                params: {api_key: process.env.TMDB_API, query}
            })
    
            if(!response){
                if(Platform.OS == 'android' || Platform.OS == 'ios'){
                    ToastAndroid.show(response.error, ToastAndroid.SHORT)
                }
            } else{
                return response.data
            }
        } catch (error) {
            console.log("An Error Occured!", error)
        }
    
    }


    return (
        <MovieContext.Provider value={{SearchMovies, fetchMovies}}>
            {children}
        </MovieContext.Provider>
    )
}