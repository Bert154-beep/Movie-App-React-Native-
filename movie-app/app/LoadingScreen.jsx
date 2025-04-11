import { View, Text, ActivityIndicator, Image, SafeAreaView, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'


const LoadingScreen = () => {

    const icons = require('../constants/icons')
    const images = require('../constants/images')

    return (
        <SafeAreaView className='w-full h-full bg-[#1E1E1E]'>
            <StatusBar className='bg-[#1E1E1E] text-white'/>
            <View>
                <Text className='p-5 text-2xl text-white font-semibold'>What Do You Want To Watch?</Text>
                <View className='m-3 p-2 rounded-3xl bg-[#3A3F47] flex items-center justify-between flex-row'>
                    <TextInput multiline={false} className='p-2 rounded-3xl w-4/5 text-white' placeholderTextColor='white' placeholder='Search' />
                    <TouchableOpacity><Image className='' source={icons.SearchIcon} /></TouchableOpacity>
                </View>
            </View>
            <View className='h-[500px] w-full'>
                <View className='flex items-center justify-center h-full'>
                    <View className='flex flex-col items-center gap-2'>
                        <Image source={images.NoResultImg}/>
                        <Text className='font-semibold text-xl text-white'>We Are Sorry, We cannot find any movies! </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoadingScreen