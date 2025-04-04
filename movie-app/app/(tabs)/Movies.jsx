import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import LoadingScreen from '../LoadingScreen'
import { useRouter } from 'expo-router'

const Movies = () => {

  const router = useRouter()

  const goToMovieScreen = ()=>{
    router.push('/Moviescreen')
  }

  const icons = require('../../constants/icons')

  const { fetchMovies } = require('../../services/Movies')

  const [MoviesData, setMoviesData] = useState([])

  const numColumns = 3
  const ScreenWidth = Dimensions.get("window").width
  const posterWidth = ScreenWidth / numColumns - 16

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await fetchMovies()
        if (movies) {
          setMoviesData(movies)
          
        }
      } catch (error) {
        console.log("An error Occured!")
      } 

    }

    loadMovies()

  }, [])

 


  return (
    <SafeAreaView className='w-full h-full bg-[#1E1E1E]'>
      <View>
        <Text className='p-5 text-2xl text-white font-semibold'>What Do You Want To Watch?</Text>
        <View className='m-3 p-2 rounded-3xl bg-[#3A3F47] flex items-center justify-between flex-row'>
          <TextInput multiline={false} className='p-2 rounded-3xl w-4/5 text-white' placeholderTextColor='white' placeholder='Search' />
          <TouchableOpacity><Image className='' source={icons.SearchIcon} /></TouchableOpacity>
        </View>
      </View>
      <View className=''>
       <FlatList
       data={MoviesData}
       keyExtractor={(item)=> item.id.toString()}
       numColumns={numColumns}
       renderItem={({item})=> (
        <View>
          <View className='p-2 w-full'>
           <TouchableOpacity onPress={goToMovieScreen}><Image className='rounded-lg' source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}} style={{width: posterWidth, height: 200}}/>
            <View className='w-full flex items-center justify-center mt-2'><Text className='w-[110px] font-semibold text-white break-words'>{item.original_title}</Text></View></TouchableOpacity> 
          </View>
        </View>
       )}
       style={{gap: 5, padding: 2}}
       />
      </View>
    </SafeAreaView>
  )
}

export default Movies