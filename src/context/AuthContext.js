import { createContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../utils/tokenStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () =>{
    const token = await getToken();
    setIsAuthenticated(!!token);
  }

  useEffect(() => {
    checkAuth();},[]);

  const login = async (token) => {
    await saveToken(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};