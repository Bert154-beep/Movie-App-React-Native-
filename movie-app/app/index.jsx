import { View, Text, StatusBar, Image, TouchableOpacity, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import '../global.css'
import { useRouter } from 'expo-router'

const Onboarding = () => {
    const image = require('../constants/images')
    const router = useRouter()
    const goToSignin = ()=>{
        router.push('/signin')
    }

    return (
        <SafeAreaView className='w-full h-full bg-[#1E1E1E]'>
            <StatusBar barStyle='light-content' backgroundColor='#1E1E1E' />
            <View className='flex items-center mt-24'>
                <Text className='text-5xl font-bold text-white'>CineVerse</Text>
                <Text className='text-sm p-5 text-white flex  mt-2'>Discover and explore a vast library of movies with detailed information, including ratings, reviews, and trailers. Stay updated with the latest releases and find your next favorite film effortlessly!</Text>
            </View>
            
            <View className='flex w-full h-[250px] justify-center items-center'>
                <Image source={image.OnboardingImg} />
            </View>

            <View className='flex items-center justify-center p-5 mt-10'>
               <TouchableOpacity onPress={goToSignin} className='p-5 w-[300px] bg-blue-500 rounded-3xl flex items-center justify-center'>
                    <Text className='text-lg font-bold text-white'>Get Started</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Onboarding