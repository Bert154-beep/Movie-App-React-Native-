import { createContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import api from '../services/axios'
import { Platform, ToastAndroid } from "react-native";


export const userContext = createContext({})

export function UserProvider({ children }) {
    console.log("Mounted")

    const router = useRouter()

    const [User, setUser] = useState(null)



    const registerUser = async (data) => {

        try {
            const { fullName, Email, password, ConfirmPassword } = data
            const response = await api.post('/auth/registerUser', {
                fullName, Email, password, ConfirmPassword
            }, { withCredentials: true })

            const responseData = response.data

            if (responseData.error) {
                if (Platform.OS === 'android' || Platform.OS == 'ios') {
                    ToastAndroid.show(responseData.error, ToastAndroid.SHORT);
                }
            } else {
                if (Platform.OS === 'android' || Platform.OS == 'ios') {
                    ToastAndroid.show('Registered Successfully!', ToastAndroid.SHORT);
                }
                router.push('/signin')
            }
        } catch (error) {
            console.log(error)
            if (Platform.OS === 'android' || Platform.OS == 'ios') {
                ToastAndroid.show(error, ToastAndroid.SHORT);
            }
        }

    }

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const response = await api.get('/auth/getUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Response: ", response)
            const user = response.data
            console.log("User is: ", user)

            if (user.error) {
                if (Platform.OS == 'android' || Platform.OS == 'ios') {
                    ToastAndroid.show(user.error, ToastAndroid.SHORT)
                }
            } else {
                await AsyncStorage.setItem('userProfile', JSON.stringify(user))
                setUser(user)
            }
        } catch (error) {
            if (Platform.OS == 'android' || Platform.OS == 'ios') {
                ToastAndroid.show("An Error Occured!", ToastAndroid.SHORT)
            }
            console.log("An Error Occured!", error)
        }
    }

    const loginUser = async (data) => {
        try {
            const { Email, password } = data
            const response = await api.post('/auth/loginUser', {
                Email, password
            }, { withCredentials: true })

            const responseData = response.data
            const token = response.data.token

            if (responseData.error) {
                if (Platform.OS == 'android' || Platform.OS == 'ios') {
                    ToastAndroid.show(responseData.error, ToastAndroid.SHORT)
                }
            } else {
                await AsyncStorage.setItem('userToken', token)
                await fetchUser()
                router.push('/Movies')
                if (Platform.OS == 'android' || Platform.OS == 'ios') {
                    ToastAndroid.show("Login Successful!", ToastAndroid.SHORT)
                }
            }

        } catch (error) {
            if (Platform.OS == 'android' || Platform.OS == 'ios') [
                ToastAndroid.show("An Error Occured!")
            ]
            console.log("An Error Occured!", error)
        }
    }


    const logoutUser = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('UserProfile');
        setUser(null);
        router.push('/(auth)/signin');
    }

    const DeleteUser = async ()=>{
        console.log("Deleting User...")
        try {
            const token = await AsyncStorage.getItem('userToken')
            const userProfile = JSON.parse(await AsyncStorage.getItem('userProfile'))
            console.log(userProfile.userId)
            const response = await api.delete('/auth/deleteUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    userId: userProfile.userId
                }
            })

            const responseData = response.data

            if(responseData.error){
                if(Platform.OS == 'android' || Platform.OS == 'ios'){
                    ToastAndroid.show(responseData.error, ToastAndroid.SHORT)
                }
               
            } else{
                if(Platform.OS == 'android' || Platform.OS == 'ios'){
                    ToastAndroid.show("User Deleted!", ToastAndroid.SHORT)
                }
                router.push('/signin')
            }
        } catch (error) {
                if(Platform.OS == 'android' || Platform.OS == 'ios'){
                    ToastAndroid.show("An Error Occured!", ToastAndroid.SHORT)
                }
                console.log("Error: ", error)
        }
    }


    return (
        <userContext.Provider value={{ loginUser, registerUser, User, logoutUser, DeleteUser }}>
            {children}
        </userContext.Provider>
    )
}

