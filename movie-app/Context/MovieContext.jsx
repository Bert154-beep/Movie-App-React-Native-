import { createContext, useState } from "react";
import { Platform, ToastAndroid } from 'react-native'
import api from '../services/axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    const getMovieById = async ()=>{
        try {
            const token = await AsyncStorage.getItem('userToken')
            const movieId = JSON.parse(await AsyncStorage.getItem('MovieId'))
            console.log("Movie is: ", movieId)
            const response = await api.get('/Movies/getMovieById', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    movieId: movieId
                }
            })

            const responseData = response.data

            if(responseData.error){
                if(Platform.OS == 'android' || Platform.OS == 'ios'){
                    ToastAndroid.show(responseData.error, ToastAndroid.SHORT)
                }
            } else{
                await AsyncStorage.removeItem('MovieId')
                return responseData
            }
        } catch (error) {
            if(Platform.OS == 'android' || Platform.OS == 'ios'){
                ToastAndroid.show('An Error Occured!', ToastAndroid.SHORT)
            }
            console.log("An Error Occured!", error)
        }
    }


    return (
        <MovieContext.Provider value={{SearchMovies, fetchMovies, getMovieById}}>
            {children}
        </MovieContext.Provider>
    )
}