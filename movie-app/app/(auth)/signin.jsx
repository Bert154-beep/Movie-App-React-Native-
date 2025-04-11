import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Pressable, Image, ToastAndroid, StatusBar } from 'react-native'
import React from 'react'
import '../../global.css'
import { useState } from 'react'
import { useContext } from 'react'
import { userContext } from '../../Context/UserContext'
import { useRouter } from 'expo-router'


const signin = () => {
  const icons = require('../../constants/icons')

  const router = useRouter()

  const {loginUser} = useContext(userContext)

  const [data, setdata] = useState({
    Email: '',
    password: ''  
  })

  const handleSubmit = async ()=>{
    try {
      await loginUser(data)
      setdata({
        Email: '',
        password: ''
      })
    } catch (error) {
      console.log(error)
      ToastAndroid.show('Login Failed!', ToastAndroid.SHORT)
    }
  }

  const NavigateToSignUp = ()=>{
    router.push('/signup')
  }
  return (
    <SafeAreaView className='h-full w-full bg-[#1E1E1E]'>
      <StatusBar className='bg-[#1E1E1E] text-white'/>
      <View className='flex h-[600px] gap-5 items-center justify-center'>
        <Text className='text-white font-bold text-3xl  flex items-center justify-center'>Welcome To CineVerse!</Text>
        <Text className='text-sm text-[#99A1AA]'>Sign in to your account.</Text>
        <View className='flex flex-row justify-center items-center gap-2 border-2 bg-[#1E1E1E] p-2 rounded-3xl border-white'>
          <Image source={icons.userIcon} size={24}/>
          <TextInput value={data.Email} onChangeText={(text)=>{setdata({...data, Email: text})}} className='outline-none w-[300px] text-white' placeholder='Enter Your Username.' placeholderTextColor='#99A1AA' />
        </View>
        <View className='flex flex-row justify-center items-center gap-2 border-2 bg-[#1E1E1E] p-2 rounded-3xl border-white'>
          <Image source={icons.passIcon} size={24}/>
          <TextInput value={data.password} onChangeText={(text)=>{setdata({...data, password: text})}} className='outline-none w-[300px] text-white' placeholder='Enter Your Password.' secureTextEntry={true} placeholderTextColor='#99A1AA' />
        </View>
        <View><TouchableOpacity onPress={handleSubmit} className='p-5 mt-3 bg-blue-500 w-[350px] flex items-center rounded-xl'><Text className='text-white font-bold'>Log In</Text></TouchableOpacity></View>
        <View className='flex flex-row gap-1'><Text className='text-white font-bold'>Dont Have An Account?</Text><TouchableOpacity onPress={NavigateToSignUp}><Text className='text-blue-500'>Sign In</Text></TouchableOpacity></View>
      </View>
    </SafeAreaView>
  )
}

export default signin 