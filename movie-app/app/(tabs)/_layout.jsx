import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'


const Tabslayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarStyle : {
        backgroundColor: '#1E1E1E',
        borderTopWidth: 2,
        borderTopColor: 'blue'
      }
    }}>
      <Tabs.Screen name='Movies' options={{headerShown: false, tabBarIcon: ({color})=> <Ionicons name='film' size={24} color={color}/>} } />
      <Tabs.Screen name='Watchlist' options={{headerShown: false, tabBarIcon: ({color})=> <Ionicons name='play' size={24} color={color}/>}}/>
      <Tabs.Screen name='Profile' options={{headerShown: false , tabBarIcon: ({color})=> <Ionicons name='person' size={24} color={color}/>} } />
    </Tabs>
  )
}

export default Tabslayout