import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'

const Watchlist = () => {

  const images = require('../../constants/images')
  const icons = require('../../constants/icons')

  return (
    <SafeAreaView className='bg-[#1E1E1E] w-full h-full'>
      <StatusBar className='bg-[#1E1E1E] text-white'/>
      <View className='flex w-full items-center justify-center'><Text className='font-bold text-white p-5 text-2xl'>Watch List</Text></View>
      <View className='p-6'>
        <View className='flex flex-row gap-3'>
          <Image className='h-[180px] rounded-2xl w-[130px]' source={images.Img1} />
          <View className='flex flex-col gap-2'>
          <Text className='text-white font-semibold text-lg'>Spider-Man 2</Text>
          <View className='flex flex-row gap-1 mt-2 items-center '>
          <Image source={icons.StarIcon}/>
          <Text className='text-[#FF8700] font-bold'>9.5</Text>
          </View>
          <View className='flex flex-row gap-1 items-center '>
          <Image source={icons.TicketIcon}/>
          <Text className='text-white font-bold'>Action</Text>
          </View>
          <View className='flex flex-row gap-1 items-center '>
          <Image source={icons.CalenderIcon}/>
          <Text className='text-white font-bold'>2004</Text>
          </View>
          <View className='flex flex-row gap-1 items-center '>
          <Image source={icons.ClockIcon}/>
          <Text className='text-white font-bold'>125 Minutes</Text>
          </View>

          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Watchlist