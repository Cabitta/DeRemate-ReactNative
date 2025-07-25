import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Platform } from "react-native";

export const getBaseURL = () => {
  //Tienen que poner la direccion IP de la computadora
  if (Platform.OS === "android") {
    return process.env.API_BASE_URL_EMULATOR;
  } else {
    return process.env.API_BASE_URL_WEB;
  }
};

export const useAuthAxios = () => {
  const { tokens, login, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const axiosInstance = useRef(
    axios.create({
      baseURL: getBaseURL(),
      timeout: 10000,
    })
  );

  useEffect(() => {
    const instance = axiosInstance.current;

    // Interceptor para las solicitudes
    instance.interceptors.request.use(
      async (config) => {
        if (!tokens) return config;

        const { token, refreshToken, expirationDate } = tokens;

        if (!token) return config;

        const isExpired = expirationDate
          ? dayjs().isAfter(dayjs(expirationDate))
          : false;

        if (isExpired) {
          if (refreshToken) {
            try {
              const response = await axios.post(
                getBaseURL() + "/auth/refresh",
                { refreshToken }
              );

              const {
                token: newToken,
                refreshToken: newRefreshToken,
                expirationDate: newExpirationDate,
                user,
              } = response.data;

              const newTokens = {
                token: newToken,
                refreshToken: newRefreshToken,
                expirationDate: newExpirationDate,
              };

              await login(newTokens, user);

              config.headers.Authorization = `Bearer ${newToken}`;
            } catch (error) {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
              return Promise.reject(error);
            }
          } else {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
            return Promise.reject(
              new Error("Token expirado y sin refresh token")
            );
          }
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para las respuestas
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
        return Promise.reject(error);
      }
    );
  }, [tokens, login, logout, navigation]);

  return axiosInstance.current;
};
