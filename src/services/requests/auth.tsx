import { resetAndNavigate } from "../../utils/NavigationUtils";
import apiClient from "../apiClient";
import { BASE_URL } from "../config";
import { setAccessToken, setRefreshToken ,removeAccessToken,removeRefreshToken,getRefreshToken} from "../storage";
import axios from "axios";

export const loginWithGoogle = async (idToken: string) => {
   
    const {data} = await apiClient.post('/user/login', {id_token: idToken});
    setAccessToken(data?.accessToken);
    setRefreshToken(data?.refeshToken);
    return data?.user;
};

export const logout = async () => {
    removeAccessToken();
    removeRefreshToken();
    resetAndNavigate('LoginScreen');
}
export const refresh_token = async ():Promise<boolean> => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }
        const {data} = await  axios.post(`${BASE_URL}/user/refresh`, {
            refreshToken
        });
        if(data?.accessToken ) {
            setAccessToken(data?.accessToken);
            return true;
        } else{
            throw new Error('Failed to refresh access token');
        }
        
    } catch (error) {
       console.log('Error refreshing token:', error);
       logout() 
       return false;
    }
}