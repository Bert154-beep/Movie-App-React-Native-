import api from './axios'
import { ToastAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const registerUser = async (data, router)=>{
    
    try {
        const {fullName, Email, password, ConfirmPassword} = data
        const response = await api.post('/auth/registerUser', {
            fullName, Email, password, ConfirmPassword
        }, {withCredentials: true})
        
        const responseData = response.data

        if(responseData.error){
            if (Platform.OS === 'android' || Platform.OS == 'ios') {
                ToastAndroid.show(responseData.error, ToastAndroid.SHORT);
            }
        } else{
            if (Platform.OS === 'android' || Platform.OS == 'ios') {
                ToastAndroid.show('Registered Successfully!', ToastAndroid.SHORT);
            }

            router.push('/Movies')
            
        }
    } catch (error) {
        console.log(error)
        if (Platform.OS === 'android' || Platform.OS == 'ios') {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        }
    }

}

export const loginUser = async (data, router)=>{


    try {
        const {Email, password} = data
        const response = await api.post('/auth/loginUser', {
            Email, password
        }, {withCredentials: true})

        const responseData = response.data

        if(responseData.error){
            if(Platform.OS == 'android'|| Platform.OS == 'ios' ){
                ToastAndroid.show(responseData.error, ToastAndroid.SHORT)
            }
        }else{
            if(Platform.OS == 'android' || Platform.OS == 'ios'){
                ToastAndroid.show("Login Successful!", ToastAndroid.SHORT)
            }

            await AsyncStorage.setItem('userToken', JSON.stringify(responseData))

            router.push('/Movies')

        }
    } catch (error) {
        if(Platform.OS == 'android' || Platform.OS == 'ios')[
            ToastAndroid.show("An Error Occured!")
        ]
        console.log("An Error Occured!", error)
    }
}

export const getUser = async ()=>{
    try {
        const token = await AsyncStorage.getItem('userToken')
        const response = await api.get('/auth/getUser', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const responseData = response.data

        if(responseData.error){
            if(Platform.OS == 'android' || Platform.OS == 'ios'){
                ToastAndroid.show(responseData.error, ToastAndroid.SHORT)
            } else{
                const user = await AsyncStorage.setItem('user', JSON.stringify(responseData))
                console.log(user)
            }
        }
    } catch (error) {
        if(Platform.OS == 'android' || Platform.OS == 'ios'){
            ToastAndroid.show("An Error Occured")
        }
        console.log(error)
    }
}