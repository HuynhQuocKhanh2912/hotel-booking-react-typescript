import type { BaseUserApi, CurrentUser } from "@/interfaces/auth.interface";
import { create } from "zustand";

//  save user in local
const userLocal = localStorage.getItem("user");
const parseUser: BaseUserApi<CurrentUser> | null = userLocal
  ? JSON.parse(userLocal)
  : null;

type authStore = {
  user: BaseUserApi<CurrentUser> | null;
  setUser: (user: BaseUserApi<CurrentUser>) => void;
  clearUser: () => void;
};
export const useAuthStore = create<authStore>((set) => ({
  user: parseUser, //default value
  setUser: (user: BaseUserApi<CurrentUser>) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
