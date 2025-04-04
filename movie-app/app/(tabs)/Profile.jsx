import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'

const Profile = () => {

  const { getUser } = require('../../services/authService')
  const [User, setUser] = useState(null)

  useEffect(() => {
    const UserInfo = async () => {
      const token = await AsyncStorage.getItem('userToken')
      console.log(token)
      if (token) {
        const user = await getUser()
        console.log(user)
        setUser(user)
      }
    }

    UserInfo()
  }, [])

  console.log(User)


  return (
    <SafeAreaView className='bg-[#1E1E1E] w-full h-full'>
      <View className='flex flex-row w-full justify-between'>
        <View className='p-5 flex flex-row items-center justify-end  gap-2'>
          <Ionicons name='person-circle-outline' color={'white'} size={32} />
          <Text className='text-lg font-bold text-white'>Username</Text>
        </View>
        <View className='p-5'>
          <TouchableOpacity className='flex flex-row items-center justify-end  gap-2'><Text className='text-lg text-red-600 font-bold'>Logout</Text>
            <Ionicons name='log-out-outline' size={32} color={'red'} /></TouchableOpacity>
        </View>
      </View>
      <View>
        <View className='p-5 gap-2'>
          <Text className='text-white font-bold text-xl'>Username</Text>
          <View className='bg-[#1E1E1E] border-2 border-white text-[#99A1AA] w-[380px] rounded-2xl p-5'></View>
        </View>
        <View className='p-5 gap-2'>
          <Text className='text-white font-bold text-xl'>Email</Text>
          <View className='bg-[#1E1E1E] border-2 border-white text-[#99A1AA] w-[380px] rounded-2xl p-5'></View>
        </View>
        <View className='p-5 flex items-center justify-center'><TouchableOpacity className='w-[380px] p-5 flex items-center justify-center rounded-3xl bg-red-600'><Text className='font-bold text-white text-lg'>Delete Account</Text></TouchableOpacity></View>
      </View>
    </SafeAreaView>
  )
}

export default Profile