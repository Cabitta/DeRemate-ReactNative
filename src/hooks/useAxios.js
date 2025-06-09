import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export const useAxios = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const axiosInstance = useRef(
    axios.create({
      baseURL: "http://localhost:3000/api", //"http://192.168.0.228:3000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  useEffect(() => {
    const instance = axiosInstance.current;

    instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response?.status === 401) {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
        return Promise.reject(err);
      }
    );
  }, []);

  return axiosInstance.current;
};

//DESDE ACA EMPIEZA EL CODIGO EN FUNCIONAMIENTO DEL ULTIMO COMMIT
// Interceptor para solicitudes
//instance.interceptors.request.use(config => {
//  console.log("Enviando solicitud:", config);
//  return config;
//}, error => {
//console.error("Error antes de enviar la solicitud:", error);
//return Promise.reject(error);
//});
// Interceptor para respuestas
//instance.interceptors.response.use(
//  response => {
//console.log("Respuesta recibida:", response);
//return response;
//},
//error => {
//console.error("Error en respuesta del servidor:", error);
//return Promise.reject(error);
//}
//);

//HASTA ACA ESTA LO QUE FUNCIONABA EN EL ULTIMO COMMIT

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
