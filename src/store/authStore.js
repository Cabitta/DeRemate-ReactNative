import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create(
  persist((set) => ({
    user: null,
    tokens: {
      token: null,
      refreshToken: null,
      expirationDate: null,
    },
    setTokens: (newTokens) => set({ tokens: newTokens }),
    setUser: (newUser) => set({ user: newUser }),
    deleteStore: () =>
      set({
        tokens: { token: null, refreshToken: null, expirationDate: null },
        user: null,
      }),
  })),
  {
    name: "auth-storage",
    getStorage: createJSONStorage(() => AsyncStorage),
  }
);
