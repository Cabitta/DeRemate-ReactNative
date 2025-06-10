import axios from 'axios';
import { useContext, useEffect, useRef } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { getToken } from '../utils/tokenStorage';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '@env';

export const useAxios = () => {
  // const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const axiosInstance = useRef(
    axios.create({
      baseURL: "http://10.0.2.2:3000/api", //http://10.0.2.2:3000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  );


  useEffect(() => {
    const instance = axiosInstance.current;
    // TODO: Implement token and logout handling
    
    // instance.interceptors.request.use(async (config) => {
    //   const token = await getToken();
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    //   return config;
    // });

    // instance.interceptors.response.use(
    //   (res) => res,
    //   async (err) => {
    //     if (err.response?.status === 401) {
    //       await logout();              
    //       navigation.reset({          
    //         index: 0,
    //         routes: [{ name: 'Login' }],
    //       });
    //     }
    //     return Promise.reject(err);
    //   }
    // );
  }, []);

  return axiosInstance.current;
};