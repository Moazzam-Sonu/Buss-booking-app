import { MMKV } from 'react-native-mmkv';
export const storage = new MMKV();
 export const setAccessToken = (token: unknown) => {
  if (typeof token === 'string') {
    storage.set('accessToken', token);
  } else {
    console.warn('Access token must be a string. Got:', token);
  }
};

export const getAccessToken = () => {
  return storage.getString('accessToken');
};

export const removeAccessToken = () => {
  storage.delete('accessToken');
};

export const setRefreshToken = (token: unknown) => {
  if (typeof token === 'string') {
    storage.set('refreshToken', token);
  } else {
    console.warn('Refresh token must be a string. Got:', token);
  }
};

  

export const getRefreshToken = () => {
  return storage.getString('refreshToken');
};
export const removeRefreshToken = () => {
  storage.delete('refreshToken');
};