import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'expo-router'

const signup = () => {

  const router = useRouter()

  const { registerUser } = require('../../services/authService')

  const icons = require('../../constants/icons')
  const [data, setdata] = useState({
    fullName: '',
    Email: '',
    password: '',
    ConfirmPassword: ''
  })

  const handleSubmit = ()=>{

    
    registerUser(data, router)
  
    
    setdata({
      fullName: '',
      Email: '',
      password: '',
      ConfirmPassword: '',
    });
  }
  

  return (
    <SafeAreaView className='w-full h-full bg-[#1E1E1E]'>
      <View className='flex items-center justify-center w-full h-[600px]'>
        <Text className='text-white font-bold text-3xl'>Create Your Account!</Text>
        <Text className='text-sm text-[#99A1AA] mt-2'>Join us & Stay Updated With Latest Releases Of Movies!</Text>
        <View className='mt-5 p-2 flex flex-row gap-2'>
          <View className='flex flex-row items-center gap-2 p-2 border-2 border-white rounded-3xl'>
              <Image source={icons.userIcon} size={5}/>
              <TextInput value={data.fullName} onChangeText={(text) => setdata({ ...data, fullName: text })}placeholder='Full Name' placeholderTextColor='#99A1AA' className='p-3 text-white text-sm bg-transparent w-[120px]'/>
          </View>
          <View className='flex flex-row items-center gap-2 p-2 border-2 border-white rounded-3xl'>
              <Image source={icons.userIcon} size={5}/>
              <TextInput value={data.Email}  onChangeText={(text) => setdata({ ...data, Email: text })} placeholder='Email Address' placeholderTextColor='#99A1AA' className='p-3 text-white text-sm bg-transparent w-[120px]'/>
          </View>
        </View>
        <View className='flex gap-2'>
          <View className='flex flex-row items-center gap-2 p-2 border-2 mt-2 border-white rounded-3xl'>
            <Image source={icons.passIcon} size={5}/>
            <TextInput placeholderTextColor='#99A1AA' secureTextEntry={true} value={data.password}  onChangeText={(text) => setdata({ ...data, password: text })} placeholder='Password' className='text-sm text-white p-3 bg-transparent w-[300px]'/>
          </View>
          <View className='flex flex-row items-center gap-2 p-2 border-2 mt-2 border-white rounded-3xl'>
            <Image source={icons.passIcon} size={5}/>
            <TextInput placeholder='Confirm Password' value={data.ConfirmPassword}  onChangeText={(text) => setdata({ ...data, ConfirmPassword: text })} placeholderTextColor='#99A1AA' secureTextEntry={true} className='text-sm text-white p-3 bg-transparent w-[300px]'/>
          </View>
        </View>
        <View className='mt-5'><TouchableOpacity onPress={handleSubmit} className='flex items-center justify-center p-5 bg-blue-500 w-[350px] rounded-3xl'><Text className='text-white font-bold'>Sign Up</Text></TouchableOpacity></View>
      </View>
    </SafeAreaView>
  )
}

export default signup