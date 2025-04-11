import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView, FlatList, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import LoadingScreen from '../LoadingScreen'
import { useRouter } from 'expo-router'
import { useContext } from 'react'
import { MovieContext } from '../../Context/MovieContext'

const Movies = () => {

  const router = useRouter()

  const goToMovieScreen = (movieId) => {
    router.push(`/Moviescreen?movieId=${movieId}`)
  }

  const icons = require('../../constants/icons')
  const images = require('../../constants/images')

  const { fetchMovies, SearchMovies } = useContext(MovieContext)


  const [MoviesData, setMoviesData] = useState([])
  const [query, setquery] = useState('')

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



  const searchMovie = async (query) => {
    if (!query) return
    try {
      const result = await SearchMovies(query)
      setMoviesData(result)
    } catch (error) {
      console.log("An Error Occured!", error)
    }
  }








  return (
    <SafeAreaView className='w-full h-full bg-[#1E1E1E]'>
      <StatusBar className='bg-[#1E1E1E] text-white' />
      <View>
        <Text className='p-5 text-2xl text-white font-semibold'>What Do You Want To Watch?</Text>
        <View className='m-3 p-2 rounded-3xl bg-[#3A3F47] flex items-center justify-between flex-row'>
          <TextInput multiline={false} value={query} onChangeText={(text) => { setquery(text) }} className='p-2 rounded-3xl w-4/5 text-white' placeholderTextColor='white' placeholder='Search' />
          <TouchableOpacity onPress={() => { searchMovie(query) }}><Image className='' source={icons.SearchIcon} /></TouchableOpacity>
        </View>
      </View>
      <View className=''>
        <FlatList
          data={MoviesData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          renderItem={({ item }) => {
            return (
              <View>
                <View className='p-2 w-full'>
                  <TouchableOpacity onPress={() => { goToMovieScreen(item.id) }}><Image className='rounded-lg' source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }} style={{ width: posterWidth, height: 200 }} />
                    <View className='w-full flex items-center justify-center mt-2'><Text className='w-[110px] font-semibold text-white break-words'>{item.original_title}</Text></View></TouchableOpacity>
                </View>
              </View>
            )
          }}
          style={{ gap: 5, padding: 2 }}
          ListEmptyComponent={() => (
            <SafeAreaView className='w-full h-full flex items-center justify-center'>
              <View className='flex items-center h-[500px] justify-center'>
                <Image source={images.NoResultImg} />
                <Text className='text-xl text-white font-bold mt-1'>We are Sorry, We can not find the Movie!</Text>
              </View>
            </SafeAreaView>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Movies