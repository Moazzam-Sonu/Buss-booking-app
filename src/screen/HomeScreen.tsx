import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { UserCircleIcon } from 'react-native-heroicons/solid'
import { logout } from '../services/requests/auth'
import Bookings from '../components/home/Bookings'

const HomeScreen = () => {
  return (
    <View className='flex-1 bg-white'>
      <SafeAreaView className='mt-3' />
        <View className='flex-row justify-between items-center px-4 py-2'>
        <Text className='text-3xl font-semibold'>Bus Tickets</Text>
        <UserCircleIcon size={38} color='red' onPress={logout} />
        </View>
       <Bookings />
    </View>
  )
}

export default HomeScreen