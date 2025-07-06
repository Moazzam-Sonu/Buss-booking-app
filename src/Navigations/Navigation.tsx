import React, {FC} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/LoginScreen';
import { navigationRef } from '../utils/NavigationUtils';
import HomeScreen from '../screen/HomeScreen';
import BusListScreen from '../screen/BusListScreen';
import SeatSelectionScreen from '../screen/SeatSelectionScreen';

const Stack = createNativeStackNavigator();
const Navigation:FC = () => {
  return (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator
    initialRouteName='SplashScreen'
    screenOptions={
        {
            headerShown: false,
            animation: 'fade_from_bottom',
            gestureEnabled: true,
    }
}
    >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BusListScreen" component={BusListScreen} />
        <Stack.Screen name="SeatSelectionScreen" component={SeatSelectionScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Navigation