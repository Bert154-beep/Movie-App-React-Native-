import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { MovieContext } from '../Context/MovieContext';

const Moviescreen = () => {


    const {movieId} = useLocalSearchParams()
    console.log(movieId)

    const {getMovieById} = useContext(MovieContext)
    const [Movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)
    const images = require('../constants/images')
    const icons = require('../constants/icons')


    useEffect(() => {
            const fetchMovie = async ()=>{
                setLoading(true);
                try {
                    await AsyncStorage.setItem('MovieId', JSON.stringify(movieId))
                    const movieFound = await getMovieById()
                    if(movieFound){
                        setMovie(movieFound)
                    }
                    
                } catch (error) {
                    console.log('An error Occured!', error)   
                }
                setLoading(false)
            }
            fetchMovie()
    }, [])

    if (loading) {
        return (
          <SafeAreaView className='bg-[#1E1E1E] w-full h-full flex justify-center items-center'>
            <Image style={{height: 100, width: 100}} source={images.LoadingImg}/>
            <Text className='text-white text-3xl mt-5'>Loading...</Text> 
          </SafeAreaView>
        );
      }

    console.log("Movie in screen: ", JSON.stringify(Movie))
    

    return (
        <SafeAreaView className='w-full h-full bg-[#1E1E1E]'>
            <StatusBar className='bg-[#1E1E1E] text-white' />
            <View className='relative'>
                <Image  style={{height: 300, width: 370}} source={{uri: `https://image.tmdb.org/t/p/original${Movie?.backdrop_path}`}} />
                <View className='absolute h-full flex justify-end mt-20 ml-5 '>
                    <View className='flex flex-row items-center gap-3'>
                        <Image style={{height: 180, width: 100}} className='rounded-2xl' source={{uri: `https://image.tmdb.org/t/p/w500${Movie.poster_path}`}} />
                        <Text className='font-bold text-2xl mt-28 break-words w-[300px] text-white'>{Movie?.original_title}</Text>
                    </View>
                </View>
            </View>
            <View className='flex flex-row gap-5 items-center justify-center mt-28'>
                <View className='flex flex-row items-center gap-2'>
                    <Image source={icons.CalenderIcon} />
                    <Text className='text-[#696974]'>{Movie?.release_date} |</Text>
                </View>
                <View className='flex flex-row items-center gap-2'>
                    <Image source={icons.ClockIcon} />
                    <Text className='text-[#696974]'>{Movie?.runtime} Minutes |</Text>
                </View>
                <View className='flex flex-row items-center gap-2'>
                    <Image source={icons.TicketIcon} />
                    <Text className='text-[#696974]'>{Movie?.genres[0].name}</Text>
                </View>
            </View>
            <View className='p-5'>
                <View>
                    <Text className='text-white font-bold text-2xl'>About Movie</Text>
                </View>
                <View className='mt-2'><Text className='text-white'>{Movie?.overview}</Text></View>
            </View>
            <View className='flex items-center justify-end h-[80px]'>
                <TouchableOpacity className='p-5 bg-blue-500 w-[330px] items-center flex rounded-2xl'><Text className='font-bold text-white'>Add to WatchList</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Moviescreen