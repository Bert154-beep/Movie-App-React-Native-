import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Moviescreen = () => {

    const images = require('../constants/images')
    const icons = require('../constants/icons')
  return (
    <SafeAreaView className='w-full h-full bg-[#1E1E1E]'>
        <View className='relative'>
            <Image className='w-full' source={images.Img2}/>
            <View className='absolute h-full flex justify-end mt-20 ml-8 '>
                <View className='flex flex-row items-center gap-5'>
                    <Image source={images.Img3}/>
                    <Text className='font-bold text-3xl mt-16 break-words w-[300px] text-white'>Spiderman: No Way Home</Text>
                </View>
            </View>
        </View>
        <View className='flex flex-row gap-5 items-center justify-center mt-28'>
            <View className='flex flex-row items-center gap-2'>
                <Image source={icons.CalenderIcon}/>
                <Text className='text-[#696974]'>2021 |</Text>
            </View>
            <View className='flex flex-row items-center gap-2'>
                <Image source={icons.ClockIcon}/>
                <Text className='text-[#696974]'>148 Minutes |</Text>
            </View>
            <View className='flex flex-row items-center gap-2'>
                <Image source={icons.TicketIcon}/>
                <Text className='text-[#696974]'>Action</Text>
            </View>
        </View>
        <View className='p-5'>
            <View>
                <Text className='text-white font-bold text-2xl'>About Movie</Text>
            </View>
            <View className='mt-2'><Text className='text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quibusdam ipsam assumenda ut quasi ea sint, incidunt repellendus labore, commodi nemo et. Quae similique, possimus atque officiis illo debitis veritatis asperiores itaque laudantium. Recusandae.</Text></View>
        </View>
        <View className='flex items-center justify-end h-[300px]'>
            <TouchableOpacity className='p-5 bg-blue-500 w-[350px] items-center flex rounded-2xl'><Text className='font-bold text-white'>Add to WatchList</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Moviescreen