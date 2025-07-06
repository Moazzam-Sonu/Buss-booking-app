import {View, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {getAccessToken, getRefreshToken} from '../services/storage';
import {resetAndNavigate} from '../utils/NavigationUtils';
import {refresh_token} from '../services/requests/auth';
import {jwtDecode }from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

const SplashScreen = () => {
  const tokenCheck = async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken() as string;
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currentTime) {
        Alert.alert('Session Expired', 'Please login again to continue.');
        return;
      }
      if (decodedAccessToken?.exp < currentTime) {
        const isRefreshed = await refresh_token();
        if (!isRefreshed) {
          Alert.alert('Session Expired', 'Please login again to continue.');
          return;
        }
      }
      resetAndNavigate('HomeScreen');
      return;
    } else {
      resetAndNavigate('LoginScreen');
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      tokenCheck();
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image source={require('../assets/images/logo_t.png')} className="h-[30%] w-[60%]" resizeMode="contain" />
    </View>
  );
};

export default SplashScreen;
