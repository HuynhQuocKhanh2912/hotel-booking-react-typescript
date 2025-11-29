import type { CurrentUser } from "@/interfaces/auth.interface";
import { create } from "zustand";

//  save user in local
const userLocal = localStorage.getItem("user");
const parseUser: CurrentUser | null = userLocal ? JSON.parse(userLocal) : null;

type authStore = {
  user: CurrentUser | null;
  setUser: (user: CurrentUser) => void;
  clearUser: () => void;
};
export const useAuthStore = create<authStore>((set) => ({
  user: parseUser, //default value
  setUser: (user: CurrentUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
