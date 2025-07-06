import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '../services/requests/auth';
import { resetAndNavigate } from '../utils/NavigationUtils';



GoogleSignin.configure({
  
  webClientId:'839848017974-balol3ektkkvkdk43p20pe6p352j7ntf.apps.googleusercontent.com',
  // offlineAccess: true,
})
const LoginScreen = () => {
  const [phone , setPhone] = useState('')
  const loginMutation = useMutation({
    mutationFn:loginWithGoogle,
    onSuccess: (data) => {
     resetAndNavigate('HomeScreen');
    },
    onError: (error) => {
      console.log('helo Login failed:', error);
    },
  });
 const handleGoogleSignIn = async () => {
    try {
     await GoogleSignin.hasPlayServices();
     const response = await GoogleSignin.signIn();
     loginMutation.mutate(response.data?.idToken as string);

    } catch (error) {
      console.log('Google Sign-In Error:', error);
    }
  } 
  return (
    <View>
    <Image source={require('../assets/images/cover.jpeg')} className='w-full h-64 bg-cover' />
    <View className='p-4'>
      <Text className='font-okra font-semibold text-xl text-center'>
      Create Account Fro Sign in
      </Text>
      <View className='my-4 mt-12 border-1 gap-2  border border-black px-2 flex-row items-center'>
    <Text className='font-okra w-[10%]  font-bold text-base'>
      +92
    </Text>
    <TextInput value={phone} onChangeText={setPhone} 
    maxLength={11} keyboardType='numeric' placeholder='Enter your phone number' className='font-okara h-11 w-[90%]' />
      </View>
      <TouchableOpacity onPress={handleGoogleSignIn} className='bg-red-700 justify-center items-center p-3'>
        <Text className='text-white font-okra font-semibold '>Sign In</Text>
      </TouchableOpacity>
      <Text className='text-center text-gray-500 mt-4 font-okara'> ---- OR ---- </Text>
      <View className='flex-row justify-center items-center mt-4 gap-3'>
       <TouchableOpacity onPress={handleGoogleSignIn} className='border border-1 border-gray-300 p-2 rounded-full'>
        <Image source={require('../assets/images/google.png')} className='w-5 h-5 contain-size' />
        </TouchableOpacity>
    <TouchableOpacity  className='border border-1 border-gray-300 p-2 rounded-full'>
        <Image source={require('../assets/images/apple.png')} className='w-5 h-5 contain-size' />
        </TouchableOpacity>
      </View>
      <Text className='mx-10 text-center text-gray-500 mt-4 font-okara'>By signing in, you agree to our <Text className='text-blue-500'>Terms of Service</Text> and <Text className='text-blue-500'>Privacy Policy</Text>.</Text>
      </View> 
    </View>
  )
}

export default LoginScreen;