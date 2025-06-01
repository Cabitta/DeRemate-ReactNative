import axios from "axios";
import { useAuthStore } from "../store/authStore";
import dayjs from "dayjs";

const authAxios = axios.create({
  baseURL: "http://localhost:3000/api",
});

authAxios.interceptors.request.use(
  async (config) => {
    const { tokens, setTokens, deleteStore } = useAuthStore.getState();
    const { token, refreshToken, expirationDate } = tokens;

    if (!token) return config;

    const isExpired = expirationDate
      ? dayjs().isAfter(dayjs(expirationDate))
      : false;

    if (isExpired) {
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/auth/refresh",
            {
              refreshToken,
            }
          );

          const {
            token: newToken,
            refreshToken: newRefreshToken,
            expirationDate: newExpirationDate,
          } = response.data;

          setTokens({
            token: newToken,
            refreshToken: newRefreshToken,
            expirationDate: newExpirationDate,
          });

          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          deleteStore();
          return Promise.reject(error);
        }
      } else {
        deleteStore();
        return Promise.reject(new Error("Token expirado y sin refresh token"));
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
