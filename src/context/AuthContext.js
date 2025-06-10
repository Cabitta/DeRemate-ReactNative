import { createContext, useState, useEffect } from "react";
import { getItem, removeItem, saveItem } from "../utils/expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // {
  //   active: null,
  //   email: null,
  //   firstname: null,
  //   lastname: null,
  //   id: null,
  // }
  // {
  //   token,
  //   refreshToken,
  //   expirationDate,
  // }
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedUser = await getItem("user");
        const storedTokens = await getItem("tokens");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedTokens) setTokens(JSON.parse(storedTokens));
      } catch (error) {
        console.error("Error loading stored data:", error);
      } finally {
      }
    };

    loadStoredData();
  }, []);

  const login = async (tokens, user) => {
    await saveItem("tokens", JSON.stringify(tokens));
    await saveItem("user", JSON.stringify(user));
    setTokens(tokens);
    setUser(user);
  };

  const logout = async () => {
    await removeItem("tokens");
    await removeItem("user");
    setUser(null);
    setTokens(null);
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
