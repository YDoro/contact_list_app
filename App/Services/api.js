import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

const api  = axios.create({
  baseURL: "https://laravel-contacts-api-test.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  }
});
api.interceptors.request.use(async (config)=>{
  const token = await AsyncStorage.getItem('@Contact:token',null);
  if (token!=null){
    config.headers.authorization = `Bearer ${token}`
  }
  return config;
})



export default api;