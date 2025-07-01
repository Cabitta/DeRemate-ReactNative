import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

const webStorage = {
  setItemAsync: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  getItemAsync: (key) => {
    const value = localStorage.getItem(key);
    return Promise.resolve(value);
  },
  deleteItemAsync: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const storage = isWeb ? webStorage : SecureStore;

export const saveItem = async (key, value) => {
  try {
    console.log(key)
    console.log(value)
    if (value === undefined || value === null) value = null
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);
    console.log(key)
    console.log(value)
    await storage.setItemAsync(key, stringValue);
  } catch (error) {
    console.error("Error saving item:", error);
    if (isWeb) {
      localStorage.setItem(key, value);
    }
  }
};

export const getItem = async (key) => {
  try {
    return await storage.getItemAsync(key);
  } catch (error) {
    console.error("Error getting item:", error);
    if (isWeb) {
      return localStorage.getItem(key);
    }
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await storage.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing item:", error);
    if (isWeb) {
      localStorage.removeItem(key);
    }
  }
};
