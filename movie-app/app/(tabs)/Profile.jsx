import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { userContext } from '../../Context/UserContext'

const Profile = () => {

  const {User, logoutUser, DeleteUser} = useContext(userContext)

  console.log(User)

  const handleLogout = async ()=>{
    console.log("Logging Out")
    await logoutUser()
  }

  const handleDelete = async ()=>{
    console.log("Deleting.....")
    await DeleteUser()
  }


  return (
    <SafeAreaView className='bg-[#1E1E1E] w-full h-full'>
      <View className='flex flex-row w-full justify-between'>
        <View className='p-5 flex flex-row items-center justify-end  gap-2'>
          <Ionicons name='person-circle-outline' color={'white'} size={32} />
          <Text className='text-lg font-bold text-white'>Username</Text>
        </View>
        <View className='p-5'>
          <TouchableOpacity onPress={handleLogout} className='flex flex-row items-center justify-end  gap-2'><Text className='text-lg text-red-600 font-bold'>Logout</Text>
            <Ionicons name='log-out-outline' size={32} color={'red'} /></TouchableOpacity>
        </View>
      </View>
      <View>
        <View className='p-5 gap-2'>
          <Text className='text-white font-bold text-xl'>Username</Text>
          <View className='bg-[#1E1E1E] border-2 border-white w-[380px] rounded-2xl p-3'><Text className='text-[#99A1AA]'>{User?.fullName || "Loading..."}</Text></View>
        </View>
        <View className='p-5 gap-2'>
          <Text className='text-white font-bold text-xl'>Email</Text>
          <View className='bg-[#1E1E1E] border-2 border-white  w-[380px] rounded-2xl p-3'><Text className='text-[#99A1AA]'>{User?.Email || "Loading..."}</Text></View>
        </View>
        <View className='p-5 flex items-center justify-center'><TouchableOpacity onPress={handleDelete} className='w-[380px] p-5 flex items-center justify-center rounded-3xl bg-red-600'><Text className='font-bold text-white text-lg'>Delete Account</Text></TouchableOpacity></View>
      </View>
    </SafeAreaView>
  )
}

export default Profile